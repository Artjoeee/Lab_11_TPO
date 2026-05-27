import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = process.env.VITE_BASE_PATH
  ? process.env.VITE_BASE_PATH.replace(/^\//, '').replace(/\/$/, '')
  : '';

export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : '/',
});
