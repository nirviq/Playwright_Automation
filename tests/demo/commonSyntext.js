
page.locator('selector', [options]) - //This is the most common way to locate elements. It allows you to use CSS selectors, text selectors, and more.
page.getByRole(role, [options]) - //This method is used to locate elements by their ARIA role. It's useful for accessibility testing.

import { test, expect } from '@playwright/test';

	
test('fill the form', async ({ page }) => {
 await page.goto('https://example.com/login');
 await page.getByLabel('Email').fill('user@example.com');
 await page.getByRole('button', { name: 'Sign in' }).click();
});


const { test, expect, browser } = require('@playwright/test');

test.describe('Full Playwright Syntax Demo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test('Common Playwright Syntax Demo', async ({ page, context }) => {

    // ─── LOCATORS ───────────────────────────────────────────
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // ─── ASSERTIONS ─────────────────────────────────────────
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveTitle('Swag Labs');

    // ─── VISIBILITY CHECK ───────────────────────────────────
    const inventoryList = page.locator('.inventory_list');
    await expect(inventoryList).toBeVisible();

    // ─── GET TEXT ────────────────────────────────────────────
    const itemName = page.locator('.inventory_item_name').first();
    await expect(itemName).toContainText('Sauce');

    // ─── COUNT ELEMENTS ──────────────────────────────────────
    const allItems = page.locator('.inventory_item');
    const itemCount = await allItems.count();
    console.log('Total items on page:', itemCount);

    // ─── NTH ELEMENT ─────────────────────────────────────────
    await allItems.nth(0).locator('button').click();

    // ─── NAVIGATION ──────────────────────────────────────────
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // ─── GET ATTRIBUTE ────────────────────────────────────────
    const cartIcon = page.locator('.shopping_cart_link');
    const cartClass = await cartIcon.getAttribute('class');
    console.log('Cart class attribute:', cartClass);

    // ─── INNER TEXT ───────────────────────────────────────────
    const cartItem = page.locator('.cart_item_label').first();
    const cartText = await cartItem.innerText();
    console.log('Cart item text:', cartText);

    // ─── IS VISIBLE / IS ENABLED ──────────────────────────────
    const checkoutBtn = page.getByRole('button', { name: 'Checkout' });
    console.log('Checkout visible:', await checkoutBtn.isVisible());
    console.log('Checkout enabled:', await checkoutBtn.isEnabled());

    // ─── CLICK AND FILL ───────────────────────────────────────
    await checkoutBtn.click();
    await page.getByLabel('First Name').fill('Asif');
    await page.getByLabel('Last Name').fill('Zaman');
    await page.getByLabel('Zip/Postal Code').fill('L5W1L2');

    // ─── KEYBOARD PRESS ───────────────────────────────────────
    await page.keyboard.press('Tab');

    // ─── SCREENSHOT ───────────────────────────────────────────
    await page.screenshot({ path: 'checkout.png' });

    // ─── CONTINUE BUTTON BY ROLE ──────────────────────────────
    await page.getByRole('button', { name: 'Continue' }).click();

    // ─── WAIT FOR URL ─────────────────────────────────────────
    await page.waitForURL('**/checkout-step-two.html');

    // ─── EVALUATE (run JS in browser) ─────────────────────────
    const pageTitle = await page.evaluate(() => document.title);
    console.log('Page title via evaluate:', pageTitle);

    // ─── FINISH ORDER ─────────────────────────────────────────
    await page.getByRole('button', { name: 'Finish' }).click();

    // ─── FINAL ASSERTION ──────────────────────────────────────
    await expect(page.getByText('Thank you for your order!')).toBeVisible();

    // ─── NEW PAGE / MULTIPLE WINDOWS ──────────────────────────
    const newPage = await context.newPage();
    await newPage.goto('https://www.saucedemo.com');
    await expect(newPage).toHaveTitle('Swag Labs');
    await newPage.close();

    // ─── WAIT FOR TIMEOUT (use sparingly) ─────────────────────
    await page.waitForTimeout(1000);

  });

  test.afterEach(async ({ page }) => {
    await page.screenshot({ path: 'final-state.png' });
  });

});
```