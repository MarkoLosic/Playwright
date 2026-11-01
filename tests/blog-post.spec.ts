import { test, expect } from '../fixtures/pages';
import { blog } from '../test-data/portfolio';

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

  test('shows the expected article content', async ({ blogPostPage }) => {
    await expect(blogPostPage.title).toHaveText(blog.featuredPost.title);
    await expect(blogPostPage.lead).toHaveText(blog.featuredPost.lead);
    await expect(blogPostPage.publishedDate).toHaveAttribute('datetime', blog.featuredPost.date);

    for (const heading of blog.featuredPost.sectionHeadings) {
      await expect(blogPostPage.sectionHeading(heading)).toBeVisible();
    }
    await expect(blogPostPage.prose).toContainText(blog.featuredPost.bodyText);
  });

  test('shows the article image and source list', async ({ blogPostPage, page, request }) => {
    const image = blogPostPage.prose.locator('img').first();
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('alt', /laptop/i);
    const imageSrc = await image.getAttribute('src');
    expect(imageSrc).toMatch(/binance-6-3-billion-hack-devops-laptop\.jpg$/);
    const imageResponse = await request.get(new URL(imageSrc!, page.url()).href);
    expect(imageResponse.ok()).toBeTruthy();
    expect(imageResponse.headers()['content-type']).toContain('image/jpeg');

    await expect(blogPostPage.sectionHeading('Sources')).toBeVisible();
    await expect(blogPostPage.prose).toContainText('Hackread');
    await expect(blogPostPage.prose).toContainText('TechCrunch');
  });

  test('translates the article title to Serbian and persists the language', async ({ blogPostPage, page }) => {
    await blogPostPage.switchLanguage();
    await expect(blogPostPage.html).toHaveAttribute('lang', 'sr');
    await expect(blogPostPage.title).toHaveText(blog.featuredPost.titleSr);

    await page.reload();
    await expect(blogPostPage.title).toHaveText(blog.featuredPost.titleSr);

    await blogPostPage.switchLanguage();
    await expect(blogPostPage.html).toHaveAttribute('lang', 'en');
    await expect(blogPostPage.title).toHaveText(blog.featuredPost.title);
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
