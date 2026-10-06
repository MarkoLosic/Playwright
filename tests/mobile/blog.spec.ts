import { test, expect } from '../../fixtures/pages';
import { blog } from '../../test-data/portfolio';

test.describe('Mobile — blog', () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.goto();
  });

  test('search works on mobile', async ({ blogPage }) => {
    await blogPage.searchInput.tap();
    await blogPage.search(blog.searchTerm);
    expect(await blogPage.visiblePosts.count()).toBeGreaterThan(0);

    await blogPage.search(blog.noMatchTerm);
    await expect(blogPage.noMatchMessage).toBeVisible();
  });

  test('tag filter works by tap', async ({ blogPage }) => {
    await blogPage.tagButton(blog.tag).tap();
    await expect(blogPage.tagButton(blog.tag)).toHaveClass(/\bon\b/);
    for (const card of await blogPage.visiblePosts.all()) {
      await expect(card).toHaveAttribute('data-tags', new RegExp(`(^|\\|)${blog.tag}(\\||$)`));
    }
  });

  test('post cards fill the screen width in a single column', async ({ blogPage }) => {
    const [first, second] = [(await blogPage.posts.nth(0).boundingBox())!, (await blogPage.posts.nth(1).boundingBox())!];
    expect(Math.round(first.x)).toBe(Math.round(second.x));
    expect(second.y).toBeGreaterThan(first.y + first.height - 1);
  });

  test('tapping a post opens it and back returns to the list', async ({ blogPage, blogPostPage, page }) => {
    await blogPage.visiblePosts.first().tap();
    await expect(blogPostPage.title).toBeVisible();
    await expect(blogPostPage.prose).toBeVisible();

    await blogPostPage.backLink.tap();
    await expect(page).toHaveURL(/\/blog\/$/);
  });
});
