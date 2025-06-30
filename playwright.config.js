// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  //timeout: 100*1000,
  // run only single file - instead of mentioning here we can give npx playwright test tests/filename.js
  //testMatch: ['Assignment.spec.js'],
  //testMatch: ['UIBasicstest.spec.js'],
  //testMatch: ['CodeGenCode.spec.js'],
  //testMatch: ['E2Etest.spec.js'],
  //testMatch: ['Calender.spec.js'],
  //testMatch: ['Alerts.spec.js'],
  //testMatch: ['WebAPIPart1.spec.js'],
  //testMatch: ['WebAPIPart2.spec.js'],
  //testMatch: ['NetworkTest.spec.js'],
  //testMatch: ['test.spec.js'],
  //testMatch: ['NetworkTest2.spec.js'],
  //testMatch: ['MoreValidations.spec.js'],
  //testMatch: ['upload-download.spec.js'],
  testMatch: ['E2EtestPO.spec.js'],
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    browserName:'chromium',
    headless: true,
    screenshot: 'on',
    //trace:'on',
    //trace:'retain-on-failure',
  },

  
});

