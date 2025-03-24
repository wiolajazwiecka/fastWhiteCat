import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  emailInput = this.page.locator('input[name="email"]');
  passwordInput = this.page.locator('input[name="password"]');
  submitButton = this.page.getByRole('button', { name: /Zaloguj/i });

  constructor(page: Page) {
    super(page);
  }

  async fillLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitLoginForm() {
    await this.submitButton.click();
  }
} 