import { test, expect } from '../../fixtures/pages';

test.describe('Mobile — navigation menu', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('shows the hamburger button and keeps the menu closed by default', async ({ homePage }) => {
    await expect(homePage.menuButton).toBeVisible();
    await expect(homePage.menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(homePage.navList).not.toHaveClass(/\bopen\b/);
    await expect(homePage.navList).toHaveCSS('pointer-events', 'none');
  });

  test('hamburger opens and closes the menu', async ({ homePage }) => {
    await homePage.openMobileMenu();
    await expect(homePage.navList).toHaveClass(/\bopen\b/);
    await expect(homePage.navList).toHaveCSS('opacity', '1');
    await expect(homePage.navLinks).toHaveCount(7);

    await homePage.closeMobileMenu();
    await expect(homePage.navList).not.toHaveClass(/\bopen\b/);
  });

  for (const [name, id] of [['About', 'about'], ['Skills', 'skills'], ['Experience', 'experience'], ['Contact', 'contact']] as const) {
    test(`menu link "${name}" scrolls to its section and closes the menu`, async ({ homePage, page }) => {
      await homePage.openMobileMenu();
      await homePage.navLink(name).tap();

      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(homePage.section(id)).toBeInViewport();
      await expect(homePage.menuButton).toHaveAttribute('aria-expanded', 'false');
      await expect(homePage.navList).not.toHaveClass(/\bopen\b/);
    });
  }

  test('tapping outside the header closes the menu', async ({ homePage }) => {
    await homePage.openMobileMenu();
    await homePage.heading.tap();
    await expect(homePage.navList).not.toHaveClass(/\bopen\b/);
  });

  test('tapping outside resets aria-expanded on the menu button', async ({ homePage }) => {
    await homePage.openMobileMenu();
    await homePage.heading.tap();
    await expect(homePage.menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('tapping outside closes the menu on the blog page too', async ({ blogPage }) => {
    await blogPage.goto();
    await blogPage.openMobileMenu();
    await blogPage.searchInput.tap();
    await expect(blogPage.navList).not.toHaveClass(/\bopen\b/);
    await expect(blogPage.menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('menu Blog link opens the blog', async ({ homePage, blogPage, page }) => {
    await homePage.openMobileMenu();
    await homePage.navLink('Blog').tap();
    await expect(page).toHaveURL(/\/blog\/$/);
    await expect(blogPage.searchInput).toBeVisible();
  });

  test('menu works on the blog page too', async ({ blogPage, page }) => {
    await blogPage.goto();
    await blogPage.openMobileMenu();
    await blogPage.navLink('Contact').tap();
    await expect(page).toHaveURL(/#contact$/);
  });
});
