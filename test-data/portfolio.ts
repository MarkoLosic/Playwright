export const portfolio = {
  title: 'Marko Lošić — QA Engineer · Test Automation',
  email: 'markolosic1993@gmail.com',
  phone: '+387 63 759 197',
  github: 'https://github.com/MarkoLosic',
  location: 'Banja Luka, Bosnia and Herzegovina',
  navSections: ['about', 'skills', 'ai', 'experience', 'education', 'contact'] as const,
  heading: { en: 'I make software reliable before users ever see it.', sr: 'Pravim softver pouzdanim prije nego ga korisnici vide.' },
  aboutHeading: { en: 'Quality is a team sport.', sr: 'Kvalitet je timski sport.' },
  copyLabel: { en: 'Copy email', sr: 'Kopiraj imejl' },
  copiedLabel: { en: 'Copied ✓', sr: 'Kopirano ✓' },
  tools: ['Playwright', 'Cypress', 'Maestro'],
};

export const blog = {
  title: /Blog/,
  searchTerm: 'maestro',
  noMatchTerm: 'zzzz-no-such-post-zzzz',
  tag: 'playwright',
  noMatchText: 'No posts match your search.',
  featuredPost: {
    title: 'The Heist of the Century: How One Laptop Cost Binance $6.3 Billion',
    titleSr: 'Pljačka stoljeća: kako je jedan laptop koštao Binance 6,3 milijarde dolara',
    excerpt: 'Binance lost an estimated $6.3 billion in the largest crypto theft ever, and the way in was a single compromised DevOps laptop. What happened and what to take away from it.',
    date: '2026-10-30',
    lead: 'Binance lost an estimated $6.3 billion in the largest crypto theft ever, and the way in was a single compromised DevOps laptop. What happened and what to take away from it.',
    sectionHeadings: [
      'Twenty minutes, ten blockchains',
      'In through a laptop, out through a service container',
      'A familiar signature: North Korea',
      'What to take away',
      'Generals after the battle',
      'Sources',
    ],
    bodyText: "On October 29, Binance, the world's largest crypto exchange, suffered the largest crypto theft in history.",
  },
};
