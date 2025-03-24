import { Page, expect } from '@playwright/test';

export class BasePage {
  cookieButton;

  constructor(protected page: Page) {
    this.cookieButton = this.page.getByRole('button', { name: 'Zgoda na wszystkie' });
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async acceptCookies() {
    await expect(this.cookieButton).toBeVisible();
    await this.cookieButton.click();
  }
} 