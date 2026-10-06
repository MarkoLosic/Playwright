import { test, expect } from '../../fixtures/pages';
import { portfolio } from '../../test-data/portfolio';

test.describe('Mobile — layout', () => {
  test('home page has no horizontal scroll', async ({ homePage }) => {
    await homePage.goto();
    expect(await homePage.horizontalOverflow()).toBeLessThanOrEqual(0);
  });

  test('blog page has no horizontal scroll', async ({ blogPage }) => {
    await blogPage.goto();
    expect(await blogPage.horizontalOverflow()).toBeLessThanOrEqual(0);
  });

  test('blog post has no horizontal scroll', async ({ blogPage, blogPostPage }) => {
    await blogPage.goto();
    await blogPage.openPost(0);
    await expect(blogPostPage.title).toBeVisible();
    expect(await blogPostPage.horizontalOverflow()).toBeLessThanOrEqual(0);
  });

  test('hero photo is stacked above the heading', async ({ homePage }) => {
    await homePage.goto();
    const photo = await homePage.photo.boundingBox();
    const heading = await homePage.heading.boundingBox();
    expect(photo && heading).toBeTruthy();
    expect(photo!.y).toBeLessThan(heading!.y);
  });

  test('hero content fits the viewport width', async ({ homePage, page }) => {
    await homePage.goto();
    const width = page.viewportSize()!.width;
    for (const el of [homePage.heading, homePage.talkButton, homePage.downloadCvButton]) {
      const box = (await el.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
  });

  test('header tools stay visible and usable', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.brand).toBeVisible();
    await expect(homePage.langButton).toBeVisible();
    await expect(homePage.themeButton).toBeVisible();
  });

  test('header buttons have touch-friendly size', async ({ homePage }) => {
    await homePage.goto();
    for (const btn of [homePage.menuButton, homePage.themeButton, homePage.langButton]) {
      const box = (await btn.boundingBox())!;
      expect(box.height).toBeGreaterThanOrEqual(32);
    }
  });

  test('theme toggle works by tap', async ({ homePage }) => {
    await homePage.goto();
    const toggled = (await homePage.currentTheme()) === 'dark' ? 'light' : 'dark';
    await homePage.themeButton.tap();
    await expect(homePage.html).toHaveAttribute('data-theme', toggled);
  });

  test('language switch works by tap', async ({ homePage }) => {
    await homePage.goto();
    await homePage.langButton.tap();
    await expect(homePage.heading).toHaveText(portfolio.heading.sr);
  });

  test('contact actions are reachable', async ({ homePage }) => {
    await homePage.goto();
    await homePage.contactSection.scrollIntoViewIfNeeded();
    await expect(homePage.contactLink('Phone')).toHaveAttribute('href', 'tel:+38763759197');
    await homePage.copyEmailButton.tap();
    await expect(homePage.copyEmailLabel).toHaveText(portfolio.copiedLabel.en);
  });
});
