import domHelper from './utils/dom-helper.ts';
import { renderAboutUsPage } from './ui/pages/about-us.ts';
import { renderHeader } from './ui/components/header.ts';
import type { Product } from './types/product.ts';
import { fetchAllProducts } from './api/products.ts';

export class App {
  private readonly root: HTMLElement;
  private readonly mainContainer: HTMLElement;
  private readonly headerElement: HTMLElement;
  private products: Product[] = [];

  constructor(root: HTMLElement) {
    this.root = root;
    this.mainContainer = domHelper.createElement('main', { className: 'main' });
    this.headerElement = renderHeader((route: string) => this.navigate(route));
  }

  public async init(): Promise<void> {
    domHelper.appendChildToElement(this.root, this.headerElement);
    domHelper.appendChildToElement(this.root, this.mainContainer);

    this.navigate('about');

    await this.loadProducts();
  }

  public navigate(route: string): void {
    switch (route) {
      case 'about':
        this.renderPage(renderAboutUsPage((route: string) => this.navigate(route)));
        break;
      case 'catalog':
        this.renderPage(
          domHelper.createElement('div', { textContent: 'Catalog page (coming soon)' }),
        );
        break;
      case 'cart':
        this.renderPage(domHelper.createElement('div', { textContent: 'Cart page (coming soon)' }));
        break;
      default:
        this.renderPage(renderAboutUsPage((route: string) => this.navigate(route)));
    }

    this.updateActiveNavButton(route);
  }

  private renderPage(pageElement: HTMLElement): void {
    this.mainContainer.innerHTML = '';
    domHelper.appendChildToElement(this.mainContainer, pageElement);
  }

  private updateActiveNavButton(currentRoute: string): void {
    const buttons = this.headerElement.querySelectorAll<HTMLButtonElement>('.header-nav-button');

    buttons.forEach((button) => {
      button.classList.toggle('active', button.dataset.route === currentRoute);
    });
  }

  private async loadProducts(): Promise<void> {
    try {
      this.products = await fetchAllProducts();
      console.log('Loaded items:', this.products);
    } catch (error) {
      console.error('Error during load:', error);
    }
  }
}
