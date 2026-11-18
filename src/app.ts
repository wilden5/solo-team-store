import domHelper from './utils/dom-helper.ts';
import { renderAboutUsPage } from './ui/pages/about-us.ts';
import { renderHeader } from './ui/components/header.ts';

export class App {
  private readonly root: HTMLElement;
  private readonly mainContainer: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.mainContainer = domHelper.createElement('main', { className: 'main' });
  }

  public init(): void {
    const header = renderHeader((route: string) => this.navigate(route));

    domHelper.appendChildToElement(this.root, header);
    domHelper.appendChildToElement(this.root, this.mainContainer);

    this.navigate('about');
  }

  public navigate(route: string): void {
    switch (route) {
      case 'about':
        this.renderPage(renderAboutUsPage());
        break;
      case 'catalog':
        break;
      case 'cart':
        break;
      default:
        this.renderPage(renderAboutUsPage());
    }
  }

  private renderPage(pageElement: HTMLElement): void {
    this.mainContainer.innerHTML = '';
    domHelper.appendChildToElement(this.mainContainer, pageElement);
  }
}
