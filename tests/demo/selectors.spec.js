
const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');

test('a11y demo', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Prefer accessible selectors where possible (placeholder/role/label)
    // Sauce Demo username input uses placeholder 'Username'
    await page.getByPlaceholder('Username').click();

    // Run axe analysis using AxeBuilder
    const results = await new AxeBuilder({ page }).analyze();

    if (results.violations && results.violations.length) {
        console.log('Axe violations:', JSON.stringify(results.violations, null, 2));
    }

    expect(results.violations.length).toBe(0);
});
