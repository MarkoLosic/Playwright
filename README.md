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
.github/        GitHub Actions workflow (tests in Docker on every PR)
Dockerfile      Test image based on mcr.microsoft.com/playwright
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

## Docker

Tests can run inside the official Playwright image, so no local browsers are needed:

```bash
npm run docker:build     # build the image (playwright-e2e)
npm run docker:test      # run all tests; report lands in ./playwright-report
```

Pass extra Playwright arguments through Docker Compose:

```bash
docker compose run --rm tests npx playwright test --project=chromium
BASE_URL=http://host.docker.internal:8080 docker compose run --rm tests
```

## CI

`.github/workflows/playwright.yml` builds the Docker image and runs the typecheck and the
full test suite on every pull request (and on demand via *Run workflow*). The HTML report
is uploaded as a build artifact; traces, screenshots and videos are uploaded when tests fail.
