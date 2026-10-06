import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly path = '/';
  readonly heading: Locator;
  readonly lead: Locator;
  readonly photo: Locator;
  readonly talkButton: Locator;
  readonly downloadCvButton: Locator;
  readonly socials: Locator;
  readonly stats: Locator;
  readonly floatChips: Locator;
  readonly aboutHeading: Locator;
  readonly jobs: Locator;
  readonly latestPostsSection: Locator;
  readonly latestPosts: Locator;
  readonly contactSection: Locator;
  readonly copyEmailButton: Locator;
  readonly copyEmailLabel: Locator;
  readonly contactList: Locator;
  readonly backToTop: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.lead = page.locator('.hero .lead');
    this.photo = page.getByRole('img', { name: 'Portrait of Marko Lošić' });
    this.talkButton = page.locator('.hero a.btn.primary');
    this.downloadCvButton = page.locator('.hero a[download]');
    this.socials = page.locator('.hero .socials');
    this.stats = page.locator('.stats .stat');
    this.floatChips = page.locator('.float-chip');
    this.aboutHeading = page.locator('#about h2');
    this.jobs = page.locator('#experience .timeline .job');
    this.latestPostsSection = page.locator('section#blog');
    this.latestPosts = page.locator('#latest .post-card');
    this.contactSection = page.locator('section#contact');
    this.copyEmailButton = page.locator('#copy');
    this.copyEmailLabel = page.locator('#copy-label');
    this.contactList = page.locator('.contact-list');
    this.backToTop = this.footer.getByRole('link', { name: /Back to top/ });
  }

  section(id: string): Locator {
    return this.page.locator(`section#${id}`);
  }

  contactLink(label: string): Locator {
    return this.contactList.locator('li', { has: this.page.locator('.k', { hasText: label }) }).getByRole('link');
  }

  async copyEmail() {
    await this.copyEmailButton.click();
  }
}
