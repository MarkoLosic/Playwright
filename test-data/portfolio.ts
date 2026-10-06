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
};
