import { test, expect } from '@playwright/test';

test('should open allegro.pl', async ({ page }) => {
  // Otwórz stronę allegro.pl
  await page.goto('https://allegro.pl');

  // Sprawdź czy strona się załadowała
  await expect(page).toHaveTitle(/Allegro/);
  
  // Poczekaj na załadowanie głównej zawartości
  await page.waitForLoadState('networkidle');
}); 