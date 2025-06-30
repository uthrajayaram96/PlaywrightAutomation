/*
This file is used for supporting multiple configuration or cross browser testing
*/

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
  //retries:1,
  testMatch: ['E2EtestPO.spec.js'],
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name:'safari',
      use: {
              browserName:'webkit',
              headless: true,
              screenshot: 'off',
              ...devices['iPhone 11'],
            }
    },
    {
      name:'chrome',
       use: {
    
              browserName:'chromium',
              headless: false,
              screenshot: 'on',
              viewport:{width:720,height:720}
            }
    }
  ]
    
});

