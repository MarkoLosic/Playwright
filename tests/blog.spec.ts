import { test, expect } from '../fixtures/pages';
import { blog } from '../test-data/portfolio';

test.describe('Blog list', () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.goto();
  });

  test('renders the post list', async ({ blogPage, page }) => {
    await expect(page).toHaveTitle(blog.title);
    await expect(blogPage.title).toBeVisible();
    await expect(blogPage.posts.first()).toBeVisible();
    await expect(blogPage.allTagButton).toHaveClass(/\bon\b/);
    await expect(blogPage.noMatchMessage).toBeHidden();
  });

  test('every post card has a title, date and link', async ({ blogPage }) => {
    const count = await blogPage.posts.count();
    for (let i = 0; i < count; i++) {
      const card = blogPage.posts.nth(i);
      await expect(card.locator('h2')).not.toBeEmpty();
      await expect(card.locator('time')).toHaveAttribute('datetime', /^\d{4}-\d{2}-\d{2}$/);
      await expect(card).toHaveAttribute('href', /.+\/$/);
    }
  });

  test('posts are sorted newest first', async ({ blogPage }) => {
    const dates = await blogPage.posts.locator('time').evaluateAll(els => els.map(e => e.getAttribute('datetime') ?? ''));
    expect(dates).toEqual([...dates].sort().reverse());
  });

  test('search filters posts', async ({ blogPage }) => {
    const total = await blogPage.posts.count();
    await blogPage.search(blog.searchTerm);
    const shown = await blogPage.visiblePosts.count();
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThanOrEqual(total);
    for (const card of await blogPage.visiblePosts.all()) {
      await expect(card).toHaveAttribute('data-search', new RegExp(blog.searchTerm, 'i'));
    }
  });

  test('search with no results shows empty state', async ({ blogPage }) => {
    await blogPage.search(blog.noMatchTerm);
    await expect(blogPage.visiblePosts).toHaveCount(0);
    await expect(blogPage.noMatchMessage).toHaveText(blog.noMatchText);

    await blogPage.search('');
    await expect(blogPage.noMatchMessage).toBeHidden();
    expect(await blogPage.visiblePosts.count()).toBe(await blogPage.posts.count());
  });

  test('tag filter shows only tagged posts', async ({ blogPage }) => {
    await blogPage.filterByTag(blog.tag);
    await expect(blogPage.tagButton(blog.tag)).toHaveClass(/\bon\b/);
    await expect(blogPage.allTagButton).not.toHaveClass(/\bon\b/);
    const shown = await blogPage.visiblePosts.all();
    expect(shown.length).toBeGreaterThan(0);
    for (const card of shown) {
      await expect(card).toHaveAttribute('data-tags', new RegExp(`(^|\\|)${blog.tag}(\\||$)`));
    }
  });

  test('tag can be preselected from the URL', async ({ blogPage }) => {
    await blogPage.gotoWithTag(blog.tag);
    await expect(blogPage.tagButton(blog.tag)).toHaveClass(/\bon\b/);
  });

  test('opening a post navigates to it', async ({ blogPage, blogPostPage, page }) => {
    const title = (await blogPage.visiblePosts.first().locator('h2').textContent())!.trim();
    await blogPage.openPost(0);
    await expect(page).toHaveURL(/\/blog\/[^/]+\/$/);
    await expect(blogPostPage.title).toHaveText(title);
  });
});
