import type { PlaywrightTestConfig } from '@playwright/test';
// import { defineConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import path from 'path';
// const env = require('./env');
import 'dotenv/config';

import dotenv from 'dotenv';
// require('dotenv').config();

// // Read from default ".env" file.
// dotenv.config();

const { NO_SETUP, SUMMARY_PATH } = process.env;
// console.log(typeof SUMMARY_PATH);

// const env = require('./env');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// export const STORAGE_STATE = path.join(__dirname, 'playwright-test/.auth/admin.json');

const config: PlaywrightTestConfig = {
  // export default defineConfig({
  globalSetup: require.resolve('./global-setup'),

  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 40 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 6000,
  },
  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // retries: 2,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    // ['html', { open: 'never' }],
    ['list', { printSteps: true }],
    // ['./utils/summaryReporter.ts'],

    [
      './utils/summaryReporter.ts',
      {
        outputFile: SUMMARY_PATH
          ? 'playwright-report/e2e/e2e-results.json'
          : 'playwright-report/api/api-results.json',
      },
    ],
    // ['html'],['line'],['allure-playwright']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: process.env.URL ?? '',
    // baseURL: env(URL ?? ''),
    // baseURL: 'https://testing.dokandev.com/',
    // baseURL: process
    // storageState: 'storageState.json',
    // ignoreHTTPSErrors: true,  //Whether to ignore HTTPS errors during navigation.
    // trace: 'on-first-retry',  //Record trace only when retrying a test for the first time.
    // screenshot: 'only-on-failure',  //Capture screenshot after each test failure.
    // video: 'on-first-retry',  //Record video only when retrying a test for the first time.

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    // api request headers
    extraHTTPHeaders: {
      Accept: '*/*',
      // 'Authorization': basicAuth,
      // 'token': `${process.env.API_TOKEN}`,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    {
      name: 'authsetup',
      testMatch: ['_auth.setup.ts'],
      retries: 1,
    },
    {
      name: 'generate',
      // testMatch: /.*\.setup\.ts/
      // testMatch: /auth\.setup\.ts/,
      testMatch: ['_generate.setup.ts'],
      dependencies: NO_SETUP ? [] : ['authsetup'],
      // fullyParallel: true,
      retries: 1,
    },
    // {
    //   name: 'datasetup',
    //   // testMatch: /.*\.setup\.ts/
    //   // testMatch: /data\.setup\.ts/
    //   testMatch: ['_data.setup.ts'],
    //   dependencies: NO_SETUP ? [] : ['generate'],
    //   // fullyParallel: true,
    //   retries: 1,
    // },
    {
      name: 'uploadsetup',
      // testMatch: /.*\.setup\.ts/
      // testMatch: /upload\.setup\.ts/
      testMatch: ['_upload.setup.ts'],
      dependencies: NO_SETUP ? [] : ['generate'],
      // fullyParallel: true,
      retries: 1,
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // storageState: 'playwright-test/.auth/admin.json',
        /* launchOptions: {
          slowMo: 2000,
        }, */
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
      // testMatch: /.*\.spec\.ts/,
      testIgnore: ['_coverage.spec.ts'],
      dependencies: NO_SETUP ? [] : ['authsetup', 'uploadsetup', 'generate'],
      // teardown: 'coverageReport',
    },

    {
      name: 'teardown',
      use: {
        ...devices['Desktop Chrome'],
      },
      testMatch: ['_coverage.spec.ts'],
    },

    // {
    //   name: 'coverageReport',
    //   testMatch: '_coverage.teardown.ts',
    // },

    //  {
    //   name: 'setup',
    //   // testMatch: '**/*.setup.ts',
    //   testMatch: /.*\.setup\.ts/,

    // },
    //  {
    //     name: 'e2e tests logged in',
    //     // testMatch: '**/*admin_exploratory_test.spec.test',
    //     dependencies: ['setup'],
    //     use: {
    //       storageState: STORAGE_STATE,
    //     },
    //   },

    /*     {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
  // });
};
export default config;
