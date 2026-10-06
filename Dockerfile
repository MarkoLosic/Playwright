# Official Playwright image: Node.js + Chromium, Firefox and WebKit with all system dependencies.
# Keep the tag in sync with the @playwright/test version in package-lock.json.
FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /app
ENV CI=true

# Install dependencies first so this layer is cached until package files change
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npx", "playwright", "test"]
