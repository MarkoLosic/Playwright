import { test, expect } from '../fixtures/pages';
import { portfolio } from '../test-data/portfolio';

test.describe('Home page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('loads with the correct title and hero content', async ({ homePage, page }) => {
    await expect(page).toHaveTitle(portfolio.title);
    await expect(homePage.heading).toHaveText(portfolio.heading.en);
    await expect(homePage.lead).toContainText('Marko Lošić');
    await expect(homePage.photo).toBeVisible();
    await expect(homePage.floatChips).toHaveText(portfolio.tools);
  });

  test('hero CTAs point to contact and the CV', async ({ homePage }) => {
    await expect(homePage.talkButton).toHaveAttribute('href', '#contact');
    await expect(homePage.downloadCvButton).toHaveAttribute('href', 'assets/Marko-Losic-CV.pdf');
  });

  test('CV file is downloadable', async ({ homePage, request }) => {
    const href = await homePage.downloadCvButton.getAttribute('href');
    const response = await request.get(`/${href}`);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/pdf');
  });

  test('shows four stats', async ({ homePage }) => {
    await expect(homePage.stats).toHaveCount(4);
  });

  test('every nav link scrolls to an existing section', async ({ homePage }) => {
    for (const id of portfolio.navSections) {
      const link = homePage.navLinks.and(homePage.page.locator(`[href="#${id}"]`));
      await link.click();
      await expect(homePage.page).toHaveURL(new RegExp(`#${id}$`));
      await expect(homePage.section(id)).toBeInViewport();
    }
  });

  test('blog nav link opens the blog', async ({ homePage, page }) => {
    await homePage.navLink('Blog').click();
    await expect(page).toHaveURL(/\/blog\/$/);
  });

  test('experience timeline lists jobs', async ({ homePage }) => {
    await expect(homePage.jobs).toHaveCount(2);
    await expect(homePage.jobs.first()).toContainText('Bravo System');
  });

  test('latest posts section shows up to three posts', async ({ homePage }) => {
    await expect(homePage.latestPostsSection).toBeVisible();
    const count = await homePage.latestPosts.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(3);
  });

  test('contact details are correct', async ({ homePage }) => {
    await expect(homePage.contactLink('Email')).toHaveAttribute('href', `mailto:${portfolio.email}`);
    await expect(homePage.contactLink('Phone')).toHaveText(portfolio.phone);
    await expect(homePage.contactLink('GitHub')).toHaveAttribute('href', portfolio.github);
    await expect(homePage.contactList).toContainText(portfolio.location);
  });

  test('copy email button gives feedback', async ({ homePage }) => {
    await homePage.copyEmail();
    await expect(homePage.copyEmailLabel).toHaveText(portfolio.copiedLabel.en);
    await expect(homePage.copyEmailLabel).toHaveText(portfolio.copyLabel.en, { timeout: 5000 });
  });

  test('footer shows the current year', async ({ homePage }) => {
    await expect(homePage.footer).toContainText(`© ${new Date().getFullYear()} Marko Lošić`);
  });
});

test.describe('Home page — theme & language', () => {
  test('theme toggle switches and persists after reload', async ({ homePage, page }) => {
    await homePage.goto();
    const initial = await homePage.currentTheme();
    const toggled = initial === 'dark' ? 'light' : 'dark';

    await homePage.toggleTheme();
    await expect(homePage.html).toHaveAttribute('data-theme', toggled);

    await page.reload();
    await expect(homePage.html).toHaveAttribute('data-theme', toggled);
  });

  test('language switch translates the page to Serbian and back', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.switchLanguage();
    await expect(homePage.html).toHaveAttribute('lang', 'sr');
    await expect(homePage.heading).toHaveText(portfolio.heading.sr);
    await expect(homePage.aboutHeading).toHaveText(portfolio.aboutHeading.sr);
    await expect(homePage.navLink('O meni')).toBeVisible();

    await page.reload();
    await expect(homePage.heading).toHaveText(portfolio.heading.sr);

    await homePage.switchLanguage();
    await expect(homePage.html).toHaveAttribute('lang', 'en');
    await expect(homePage.heading).toHaveText(portfolio.heading.en);
  });

  test('copy email feedback is translated', async ({ homePage }) => {
    await homePage.goto();
    await homePage.switchLanguage();
    await homePage.copyEmail();
    await expect(homePage.copyEmailLabel).toHaveText(portfolio.copiedLabel.sr);
  });
});
