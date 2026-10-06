import { type Locator, type Page, expect } from '@playwright/test';

/** Shared header/footer elements present on every page of the site. */
export abstract class BasePage {
  readonly html: Locator;
  readonly header: Locator;
  readonly brand: Locator;
  readonly navLinks: Locator;
  readonly langButton: Locator;
  readonly themeButton: Locator;
  readonly menuButton: Locator;
  readonly footer: Locator;

  constructor(readonly page: Page) {
    this.html = page.locator('html');
    this.header = page.locator('header#nav');
    this.brand = this.header.locator('a.brand');
    this.navLinks = page.locator('nav#links a');
    this.langButton = page.locator('#lang');
    this.themeButton = page.locator('#theme');
    this.menuButton = page.locator('#menu');
    this.footer = page.locator('footer.footer');
  }

  abstract readonly path: string;

  async goto() {
    await this.page.goto(this.path);
  }

  navLink(name: string | RegExp): Locator {
    return this.page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name });
  }

  async toggleTheme() {
    await this.themeButton.click();
  }

  async switchLanguage() {
    await this.langButton.click();
  }

  async openMobileMenu() {
    await this.menuButton.click();
    await expect(this.menuButton).toHaveAttribute('aria-expanded', 'true');
  }

  async closeMobileMenu() {
    await this.menuButton.click();
    await expect(this.menuButton).toHaveAttribute('aria-expanded', 'false');
  }

  /** The nav list is always in the DOM on mobile; it is shown by the `open` class. */
  get navList(): Locator {
    return this.page.locator('nav#links');
  }

  /** Width of the document beyond the viewport (0 = no horizontal scroll). */
  async horizontalOverflow(): Promise<number> {
    return this.page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  }

  async currentTheme(): Promise<string | null> {
    return this.html.getAttribute('data-theme');
  }
}
