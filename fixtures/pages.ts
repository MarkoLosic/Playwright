import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { BlogPage } from '../pages/BlogPage';
import { BlogPostPage } from '../pages/BlogPostPage';

type Pages = {
  homePage: HomePage;
  blogPage: BlogPage;
  blogPostPage: BlogPostPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  blogPage: async ({ page }, use) => use(new BlogPage(page)),
  blogPostPage: async ({ page }, use) => use(new BlogPostPage(page)),
});

export { expect } from '@playwright/test';
