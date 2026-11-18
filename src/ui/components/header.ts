import domHelper from '../../utils/dom-helper.ts';

type NavigateCallback = (route: string) => void;

type HeaderButton = {
  className: string;
  textContent: string;
  type: 'button' | 'submit' | 'reset';
  route: string;
};

const BUTTONS: HeaderButton[] = [
  {
    className: 'header-nav-button',
    textContent: 'About Us',
    type: 'button',
    route: 'about',
  },
  {
    className: 'header-nav-button',
    textContent: 'Catalog',
    type: 'button',
    route: 'catalog',
  },
  {
    className: 'header-nav-button',
    textContent: 'Cart',
    type: 'button',
    route: 'cart',
  },
];

const createHeaderContent = (onNavigate: NavigateCallback): HTMLElement => {
  const header = domHelper.createElement('header', { className: 'header' });

  const storeTitle = domHelper.createElement('h1', {
    className: 'header-store-title',
    textContent: 'Solo Team Store',
  });
  domHelper.appendChildToElement(header, storeTitle);

  createNavContent(header, onNavigate);

  return header;
};

const createNavContent = (header: HTMLElement, onNavigate: NavigateCallback): HTMLElement => {
  const nav = domHelper.createElement('nav', { className: 'header-nav' });
  domHelper.appendChildToElement(header, nav);

  BUTTONS.forEach((button) => {
    const buttonElement = domHelper.createElement('button', {
      className: button.className,
      textContent: button.textContent,
      type: button.type,
    });

    buttonElement.addEventListener('click', () => onNavigate(button.route));
    domHelper.appendChildToElement(nav, buttonElement);
  });

  return nav;
};

export const renderHeader = (onNavigate: NavigateCallback): HTMLElement => {
  return createHeaderContent(onNavigate);
};
