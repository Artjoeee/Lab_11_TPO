import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4173;
const APP_URL = `http://127.0.0.1:${PORT}`;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, ...options.env },
    });
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`))));
    child.on('error', reject);
    return child;
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, attempts = 30) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // server not ready
    }
    await sleep(1000);
  }
  throw new Error(`Server did not start at ${url}`);
}

async function main() {
  const serve = spawn('npx', ['serve', '-s', 'dist', '-l', String(PORT)], {
    cwd: root,
    stdio: 'ignore',
    shell: true,
    detached: true,
  });

  try {
    await waitForServer(APP_URL);
    process.env.APP_URL = APP_URL;
    await run('node', ['--test', 'tests/ui.test.js'], { env: { APP_URL } });
  } finally {
    if (serve.pid) {
      try {
        process.kill(-serve.pid);
      } catch {
        serve.kill();
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
