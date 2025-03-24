import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 180000,
  fullyParallel: false,
  workers: process.env.CI ? 1 : undefined,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html', { 
      outputFolder: 'test-reports',
      open: 'never',
      attachments: {
        'screenshots': true,
        'videos': true,
        'traces': true
      }
    }],
    ['list'],
    ['json', { outputFile: 'test-reports/test-results.json' }]
  ],
  use: {
    baseURL: 'https://4f.pl',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on',
    viewport: { width: 1280, height: 720 },
    bypassCSP: true,
    storageState: undefined,
    launchOptions: {
      args: [
        '--disable-web-security',
        '--disable-site-isolation-trials',
        '--ignore-certificate-errors',
        '--disable-http2',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    },
    navigationTimeout: 60000,
    actionTimeout: 30000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
}); 