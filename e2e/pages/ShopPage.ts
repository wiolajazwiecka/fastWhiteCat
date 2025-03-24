import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShopPage extends BasePage {
    
  categoryLink = (name: string) => this.page.getByRole('navigation').getByRole('link', { name: name });
  subcategoryLink = (name: string) => this.page.getByRole('link', { name: name });
  productLink = (name: string) => this.page.locator(`a.item-images-qig:has(img[title="${name}"])`);
  cartButton = this.page.getByRole('button', { name: 'Mini Cart' });
  cartItem = (name: string) => this.page.getByRole('listitem').getByText(name);
  sizeButton = (size: string) => this.page.getByRole('button', { name: size });
  addToCartButton = this.page.getByRole('button', { name: 'Dodaj do koszyka' });
  cartOverlay = this.page.locator('.miniCart-overlay-aYW');
  cartTotalPrice = this.page.locator('.miniCart-totalPrice-2Xx');
  productPrice = (name: string) => this.page.locator(`div.cart-item-price:has-text("${name}")`);
  cartTotalLabel = this.page.locator('.miniCart-price-pkH');
  cartSummaryAmount = this.page.locator('.summary-grandTotal-oU3 .summary-amount-dfs');
  showCartButton = this.page.getByRole('button', { name: 'Pokaż koszyk' });
  increaseQuantityButton = (productName: string) => this.page.locator(`tr:has-text("${productName}") button.quantity-plus-xvN`);
  updateCartButton = this.page.getByRole('button', { name: 'Aktualizuj' });

  constructor(page: Page) {
    super(page);
  }

  async selectCategory(categoryName: string) {
    await this.categoryLink(categoryName).click();
  }

  async selectSubcategory(subcategoryName: string) {
    await this.subcategoryLink(subcategoryName).click();
  }

  async selectProduct(productName: string) {
    const product = this.productLink(productName);
    await product.waitFor({ state: 'visible' });
    await product.click();
  }

  async selectSize(size: string) {
    await this.sizeButton(size).click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async checkProductInCart(productName: string) {
    await this.cartButton.click();
    await this.cartItem(productName).isVisible();
  }

  async closeCart() {
    await this.cartOverlay.click({ position: { x: 0, y: 0 } });
  }

  async showCart() {
    await this.showCartButton.click();
  }

  async checkCartTotalLabel(expectedTotal: string) {
    await expect(this.cartTotalLabel).toHaveText(expectedTotal);
  }

  async checkCartSummaryAmount(expectedAmount: string) {
    await this.page.waitForTimeout(1000);
    const actualText = await this.cartSummaryAmount.textContent();
    const normalizedActual = actualText?.replace(/\s+/g, ' ').replace(/\u00A0/g, ' ').replace('w tym VAT', '').trim();
    expect(normalizedActual).toBe(expectedAmount);
  }

  async getCurrentCartTotal() {
    const totalText = await this.cartTotalLabel.textContent();
    return totalText;
  }

  async increaseProductQuantity(productName: string) {
    await this.increaseQuantityButton(productName).click();
    await this.updateCartButton.waitFor({ state: 'visible' });
    await this.updateCartButton.click();
    await this.page.waitForTimeout(2000); // Wait for cart to update
  }
} 