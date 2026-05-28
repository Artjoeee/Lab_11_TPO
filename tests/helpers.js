import chrome from 'selenium-webdriver/chrome.js';
import { Builder, By, until } from 'selenium-webdriver';

const BASE_URL = process.env.APP_URL || 'http://127.0.0.1:4173';

export function getBaseUrl() {
  return BASE_URL;
}

export async function createDriver() {
  const options = new chrome.Options();
  options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu');

  if (process.env.CHROME_BIN) {
    options.setChromeBinaryPath(process.env.CHROME_BIN);
  }

  const builder = new Builder().forBrowser('chrome').setChromeOptions(options);

  if (process.env.CHROMEDRIVER_PATH) {
    builder.setChromeService(new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH));
  }

  return builder.build();
}

export { By, until };
