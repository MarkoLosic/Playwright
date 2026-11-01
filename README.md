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

## Docker and GitHub Actions

Tests can also be run in the same Playwright Docker image used by GitHub Actions:

```bash
docker build -t playwright-tests .
docker run --rm --ipc=host playwright-tests
```

The GitHub Actions workflow runs the full test suite in Docker on every push.
HTML reports and test results are uploaded as workflow artifacts, including when
tests fail.

Set `BASE_URL` to run against another environment, e.g. a local copy of the site:

```bash
BASE_URL=http://localhost:8080 npm test
```
