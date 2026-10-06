import { test, expect } from '../fixtures/pages';

test.describe('Blog post', () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.goto();
    await blogPage.openPost(0);
  });

  test('shows header, meta and content', async ({ blogPostPage }) => {
    await expect(blogPostPage.title).not.toBeEmpty();
    await expect(blogPostPage.lead).not.toBeEmpty();
    await expect(blogPostPage.meta.locator('time')).toBeVisible();
    await expect(blogPostPage.meta).toContainText('min read');
    expect(await blogPostPage.tags.count()).toBeGreaterThan(0);
    await expect(blogPostPage.prose.locator('h2').first()).toBeVisible();
  });

  test('page title matches the post heading', async ({ blogPostPage, page }) => {
    const heading = (await blogPostPage.title.textContent())!.trim();
    await expect(page).toHaveTitle(new RegExp(heading.slice(0, 20).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });

  test('shows related posts', async ({ blogPostPage }) => {
    expect(await blogPostPage.morePosts.count()).toBeGreaterThan(0);
  });

  test('back link returns to the blog list', async ({ blogPostPage, blogPage, page }) => {
    await blogPostPage.backLink.click();
    await expect(page).toHaveURL(/\/blog\/$/);
    await expect(blogPage.searchInput).toBeVisible();
  });

  test('contact CTA leads to the contact section', async ({ blogPostPage, homePage, page }) => {
    await blogPostPage.contactButton.click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(homePage.contactSection).toBeVisible();
  });
});
