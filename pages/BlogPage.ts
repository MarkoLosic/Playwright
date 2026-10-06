import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BlogPage extends BasePage {
  readonly path = '/blog/';
  readonly title: Locator;
  readonly searchInput: Locator;
  readonly tagButtons: Locator;
  readonly allTagButton: Locator;
  readonly posts: Locator;
  readonly visiblePosts: Locator;
  readonly noMatchMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('h1.blog-title');
    this.searchInput = page.getByRole('searchbox', { name: 'Search posts' });
    this.tagButtons = page.locator('#tags .tag');
    this.allTagButton = page.locator('#tags .tag[data-t=""]');
    this.posts = page.locator('#posts .post-card');
    this.visiblePosts = page.locator('#posts .post-card:not([hidden])');
    this.noMatchMessage = page.locator('#none');
  }

  async gotoWithTag(tag: string) {
    await this.page.goto(`${this.path}?tag=${encodeURIComponent(tag)}`);
  }

  tagButton(tag: string): Locator {
    return this.page.locator(`#tags .tag[data-t="${tag}"]`);
  }

  async search(term: string) {
    await this.searchInput.fill(term);
  }

  async filterByTag(tag: string) {
    await this.tagButton(tag).click();
  }

  async openPost(index = 0) {
    await this.visiblePosts.nth(index).click();
  }
}
