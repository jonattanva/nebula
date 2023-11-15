import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'bun run start e2e/site --port 4000',
        reuseExistingServer: !process.env.CI,
        port: 4000
    },
    testDir: './e2e'
});
