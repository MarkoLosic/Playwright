# Playwright E2E — markolosic.github.io

End-to-end tests for [markolosic.github.io](https://markolosic.github.io) written with
[Playwright](https://playwright.dev) and TypeScript, using the **Page Object Model**.

## Structure

```
pages/          Page objects (BasePage, HomePage, BlogPage, BlogPostPage)
fixtures/       Custom test fixture that injects page objects into tests
test-data/      Expected content used by the assertions
tests/          Desktop specs (home page, blog list, blog post)
tests/mobile/   Mobile specs (menu, layout, blog) — Pixel 7 and iPhone 14
```

## Setup

```bash
npm install
npx playwright install
```

## Running

```bash
npm test                 # all browsers (Chromium, Firefox, WebKit, mobile Chrome, mobile Safari)
npm run test:chromium    # Chromium only
npm run test:mobile      # mobile devices only
npm run test:headed      # watch the browser
npm run test:ui          # Playwright UI mode
npm run report           # open the last HTML report
```

Set `BASE_URL` to run against another environment, e.g. a local copy of the site:

```bash
BASE_URL=http://localhost:8080 npm test
```
