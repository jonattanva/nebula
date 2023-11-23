import { test, expect } from '@playwright/test';

test.describe('sync offline', () => {
    test('should validate the form', async ({ page }) => {
        await page.goto('/', { waitUntil: 'commit' });

        await page.getByTestId('save').click();
        await expect(
            page.getByText(/there were 3 errors with your submission/i)
        ).toBeVisible();

        await expect(page.getByText(/the name is required/i)).toBeVisible();
        await expect(page.getByText(/the lastname is required/i)).toBeVisible();
        await expect(page.getByText(/the email is required/i)).toBeVisible();
    });

    test('should register the form', async ({ page }) => {
        await page.goto('/', { waitUntil: 'commit' });

        await page.getByTestId('first-name').fill('Solid');
        await page.getByTestId('last-name').fill('Snake');
        await page.getByTestId('email').fill('solid.sname@wxample.com');

        await page.getByTestId('save').click();

        await expect(page.getByText(/no data/i)).not.toBeVisible();

        await expect(page.getByText(/solid snake/i)).toBeVisible();
        await expect(page.getByText(/solid.sname@wxample.com/i)).toBeVisible();
    });
});
