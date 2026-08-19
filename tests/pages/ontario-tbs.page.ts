import { expect, type Page } from '@playwright/test';

export class OntarioTbsPage {
  readonly page: Page;
  readonly url = 'https://www.ontario.ca/page/treasury-board-secretariat';

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  async expectAvailable(): Promise<void> {
    const bodyText = await this.page.locator('body').innerText();
    if (/temporarily limited your network|higher volume of requests/i.test(bodyText)) {
      throw new Error(
        'Ontario blocked this network temporarily because of request volume. Retry later or use a permitted test environment.'
      );
    }
  }

  async expectLoaded(): Promise<void> {
    await this.expectAvailable();
    await expect(this.page).toHaveTitle(/Treasury Board Secretariat \| ontario\.ca/i);
    await expect(this.page.locator('h1')).toContainText('Treasury Board Secretariat');
    await expect(this.page.locator('main')).toBeVisible();
    await expect(
      this.page.getByRole('link', { name: 'Government of Ontario home page' })
    ).toBeVisible();
  }

  async expectKeyContent(): Promise<void> {
    const body = this.page.locator('body');
    await expect(body).toContainText('Accountability');
    await expect(body).toContainText('What we do');
  }
}
