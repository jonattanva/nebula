import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'pnpm run --dir e2e/site start --port 4000',
        reuseExistingServer: !process.env.CI,
        port: 4000
    },
    testDir: './e2e',

    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,

    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: process.env.CI
        ? [['github'], ['html', { open: 'on-failure' }]]
        : [['html', { open: 'on-failure' }]],

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'http://127.0.0.1:4000',

        // Collect trace when retrying the failed test.
        trace: process.env.CI ? 'on-first-retry' : 'on',
        ...devices['Desktop Chrome']
    }
});
