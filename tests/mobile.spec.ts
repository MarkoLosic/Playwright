import { test, expect } from '../fixtures/pages';

test.describe('Mobile navigation', () => {
  test('hamburger menu opens and closes after navigating', async ({ homePage, page }) => {
    await homePage.goto();
    await expect(homePage.menuButton).toBeVisible();
    await expect(homePage.menuButton).toHaveAttribute('aria-expanded', 'false');

    await homePage.openMobileMenu();
    await homePage.navLink('Contact').click();

    await expect(page).toHaveURL(/#contact$/);
    await expect(homePage.menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(homePage.contactSection).toBeInViewport();
  });
});
