import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BlogPostPage extends BasePage {
  readonly path: string;
  readonly title: Locator;
  readonly lead: Locator;
  readonly meta: Locator;
  readonly tags: Locator;
  readonly prose: Locator;
  readonly backLink: Locator;
  readonly copyLinkButton: Locator;
  readonly contactButton: Locator;
  readonly morePosts: Locator;

  constructor(page: Page, slug = '') {
    super(page);
    this.path = `/blog/${slug}/`;
    this.title = page.locator('article h1');
    this.lead = page.locator('.post-head .lead');
    this.meta = page.locator('.post-head .meta');
    this.tags = page.locator('.post-head .tags span');
    this.prose = page.locator('article .prose');
    this.backLink = page.locator('a.back');
    this.copyLinkButton = page.locator('#share');
    this.contactButton = page.locator('.post-end a.btn.primary');
    this.morePosts = page.locator('.more-posts .post-card');
  }
}
