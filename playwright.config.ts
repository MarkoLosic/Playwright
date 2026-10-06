import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://markolosic.github.io',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: /mobile\// },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: /mobile\// },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: /mobile\// },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] }, testMatch: /mobile\// },
    { name: 'mobile-safari', use: { ...devices['iPhone 14'] }, testMatch: /mobile\// },
  ],
});
