import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  profileButton = this.page.locator('[clip-path="url(#user_svg__a)"]');
  registerButton = this.page.getByRole('button', { name: /Zarejestruj/i });
  loginButton = this.page.getByRole('button', { name: /Zaloguj/i });
  shopLink = this.page.getByRole('link', { name: /Sklep/i });

  constructor(page: Page) {
    super(page);
  }

  async openProfile() {
    await this.profileButton.click();
  }

  async clickLogin() {
    await this.loginButton.click();
  }
} 