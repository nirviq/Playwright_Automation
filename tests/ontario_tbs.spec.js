const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');

const pageUrl = 'https://www.ontario.ca/page/treasury-board-secretariat';

async function openOntarioPage(page) {
  await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });

  const bodyText = await page.locator('body').innerText();
  if (/temporarily limited your network|higher volume of requests/i.test(bodyText)) {
    throw new Error(
      'Ontario temporarily limited this network because of request volume. Retry later or use a permitted test environment.'
    );
  }
}

test('Ontario Treasury Board Secretariat page loads and key content is visible', async ({ page }) => {
  await openOntarioPage(page);

  await expect(page).toHaveTitle(/Treasury Board Secretariat \| ontario\.ca/i);

  const heading = page.locator('h1');
  await expect(heading).toContainText('Treasury Board Secretariat');

  await expect(page.locator('main')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Government of Ontario home page' })).toBeVisible();

  const bodyText = await page.locator('body').innerText();
  expect(bodyText).toMatch(/Treasury Board Secretariat/i);
  expect(bodyText).toMatch(/Accountability/i);
  expect(bodyText).toMatch(/What we do/i);
});

test('Ontario Treasury Board Secretariat has no critical or serious AODA violations', async ({ page }) => {
  await openOntarioPage(page);

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const criticalOrSerious = results.violations.filter(
    violation => violation.impact === 'critical' || violation.impact === 'serious'
  );

  const moderateViolations = results.violations.filter(
    violation => violation.impact === 'moderate'
  );

  if (moderateViolations.length > 0) {
    console.warn(
      'Moderate AODA findings on the live Ontario page:',
      moderateViolations.map(violation => violation.id)
    );
  }

  expect(criticalOrSerious, 'Critical or serious AODA violations found').toEqual([]);
});
