import { test, expect } from '@playwright/test';
import config from './config.secret.json';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ShopPage } from './pages/ShopPage';
import { products } from './test-data/products';

test.describe('E-commerce shopping cart test', () => {
  test('should add multiple products to cart and update quantities', async ({ page }) => {
    // Initialize page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const shopPage = new ShopPage(page);

    // Step 1: Navigate to homepage and accept cookies
    await homePage.goto();
    await expect(page).toHaveTitle(/4F/);
    await homePage.acceptCookies();

    // Step 2: Login with existing user
    await homePage.openProfile();
    await loginPage.fillLoginForm(config.login.email, config.login.password);
    await loginPage.submitLoginForm();

    // Step 3: Add first product (socks) to cart
    await shopPage.selectCategory(products.socks.category);
    await shopPage.selectSubcategory(products.socks.subcategory);
    await shopPage.selectProduct(products.socks.name);
    await shopPage.selectSize(products.socks.size);
    await shopPage.addToCart();
    await shopPage.checkProductInCart(products.socks.name);
    await shopPage.closeCart();

    // Step 4: Add second product (gloves) to cart
    await shopPage.selectCategory(products.gloves.category);
    await shopPage.selectSubcategory(products.gloves.subcategory);
    await shopPage.selectProduct(products.gloves.name);
    await shopPage.selectSize(products.gloves.size);
    await shopPage.addToCart();
    await shopPage.checkProductInCart(products.gloves.name);

    // Step 5: Update cart quantities and verify total
    await shopPage.showCart();
    await shopPage.increaseProductQuantity(products.socks.name);
    await shopPage.checkCartSummaryAmount(products.expectedPrice.totalPrice);
  });
});
