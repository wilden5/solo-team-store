import domHelper from './utils/dom-helper.ts';
import { renderAboutUsPage } from './ui/pages/about-us.ts';

export class App {
  private readonly root: HTMLElement;
  private readonly mainContainer: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.mainContainer = domHelper.createElement('main', { className: 'main' });
  }

  public init(): void {
    domHelper.appendChildToElement(this.root, this.mainContainer);

    this.renderPage(renderAboutUsPage());
  }

  private renderPage(pageElement: HTMLElement): void {
    this.mainContainer.innerHTML = '';
    domHelper.appendChildToElement(this.mainContainer, pageElement);
  }
}
