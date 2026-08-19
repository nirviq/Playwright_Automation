import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { OntarioTbsPage } from './pages/ontario-tbs.page';

test('Ontario Treasury Board Secretariat page loads', async ({ page }) => {
  const treasuryBoardPage = new OntarioTbsPage(page);

  await treasuryBoardPage.goto();
  await treasuryBoardPage.expectLoaded();
  await treasuryBoardPage.expectKeyContent();
});

test('Ontario Treasury Board Secretariat page has no critical or serious Axe violations', async ({ page }) => {
  const treasuryBoardPage = new OntarioTbsPage(page);

  await treasuryBoardPage.goto();
  await treasuryBoardPage.expectAvailable();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const criticalOrSerious = results.violations.filter(
    (violation) => violation.impact === 'critical' || violation.impact === 'serious'
  );

  if (criticalOrSerious.length > 0) {
    console.log('Critical or serious Axe violations:', JSON.stringify(criticalOrSerious, null, 2));
  }

  expect(criticalOrSerious, 'Critical or serious accessibility violations found').toEqual([]);
});
