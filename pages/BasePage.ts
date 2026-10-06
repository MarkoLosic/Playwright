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

  async currentTheme(): Promise<string | null> {
    return this.html.getAttribute('data-theme');
  }
}
