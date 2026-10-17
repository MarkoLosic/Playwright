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
    title: 'When Your Page Object Model Stops Scaling: Flow Model and Screenplay Pattern Compared',
    excerpt: 'Page objects work until the suite grows. A look at when to add a flow layer, when Screenplay earns its complexity, and when to just stay put.',
    date: '2026-10-17',
    lead: 'Page objects work until the suite grows. A look at when to add a flow layer, when Screenplay earns its complexity, and when to just stay put.',
    sectionHeadings: [
      'Where Page Object Model stops helping',
      'The middle ground: a flow layer',
      'The bigger jump: Screenplay Pattern',
      'Pitfalls and limits',
      'What to do next',
    ],
    bodyText: 'The simplest fix is to add a thin layer of reusable business flows on top of the existing page objects',
  },
};
