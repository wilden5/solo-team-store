import domHelper from '../../utils/dom-helper.ts';

const LIST_ITEMS_RAW: string[] = [
  'Product catalog with search, category and price filters',
  'Shopping cart with quantity controls and a promo code',
  'Cart state survives page reload via localStorage',
  'Unit-tested core logic with Vitest',
];

const AUTHOR_DESCRIPTION: string =
  'This is a team-task project built solo: all code, the task board, branches and pull requests, unit tests and deployment are done by one person.';

const AUTHOR_PILLS: string[] = ['TypeScript', 'Vite', 'Vitest', 'GitHub Projects'];

const createAboutProjectContent = (): HTMLElement => {
  const wrapper = domHelper.createElement('div', { className: 'about-project-wrapper' });

  const title = domHelper.createElement('h2', {
    className: 'about-project-title',
    textContent: 'About the project',
  });
  domHelper.appendChildToElement(wrapper, title);

  const list = domHelper.createElement('ul', { className: 'about-project-list' });
  domHelper.appendChildToElement(wrapper, list);

  LIST_ITEMS_RAW.forEach((item, index) => {
    domHelper.createElement(
      'li',
      { className: `about-project-list-item-${index}`, textContent: item },
      list,
    );
  });

  return wrapper;
};

const createAboutAuthorContent = (): HTMLElement => {
  const wrapper = domHelper.createElement('div', { className: 'about-author-wrapper' });

  const authorName = domHelper.createElement('h2', {
    className: 'about-author-name',
    textContent: 'Denis Ivanchenko',
  });
  domHelper.appendChildToElement(wrapper, authorName);

  const githubWrapper = domHelper.createElement('div', {
    className: 'about-author-github-wrapper',
  });
  domHelper.appendChildToElement(wrapper, githubWrapper);

  const authorGithubText = domHelper.createElement('div', {
    className: 'about-author-github-text',
    textContent: 'Denis Ivanchenko',
  });
  domHelper.appendChildToElement(githubWrapper, authorGithubText);

  const authorGithubLink = domHelper.createElement('a', {
    className: 'about-author-github-link',
    href: 'https://github.com/wilden5',
    textContent: 'wilden5',
    target: '_blank',
  });
  domHelper.appendChildToElement(githubWrapper, authorGithubLink);

  const authorDescription = domHelper.createElement('div', {
    className: 'about-author-description',
    textContent: AUTHOR_DESCRIPTION,
  });
  domHelper.appendChildToElement(wrapper, authorDescription);

  const list = domHelper.createElement('ul', { className: 'about-author-list' });
  domHelper.appendChildToElement(wrapper, list);

  AUTHOR_PILLS.forEach((item, index) => {
    domHelper.createElement(
      'li',
      { className: `about-author-list-pill-${index}`, textContent: item },
      list,
    );
  });

  return wrapper;
};

export const renderAboutUsPage = (): HTMLElement => {
  const container = domHelper.createElement('div', { className: 'about-page' });

  domHelper.appendChildToElement(container, createAboutProjectContent());
  domHelper.appendChildToElement(container, createAboutAuthorContent());

  return container;
};
