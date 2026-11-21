import domHelper from './utils/dom-helper.ts';
import { renderAboutUsPage } from './ui/pages/about-us.ts';
import { renderHeader } from './ui/components/header.ts';
import type { Product, ProductStatus } from './types/product.ts';
import { fetchAllProducts } from './api/products.ts';
import { renderCatalogPage } from './ui/pages/catalog.ts';
import { FALLBACK_PRODUCTS } from './mocks/fallback-products.ts';
import { MOCK_CART_ITEMS, renderCartPage } from './ui/pages/cart.ts';
import type { CartItem } from './types/cart.ts';

export class App {
  private readonly root: HTMLElement;
  private readonly mainContainer: HTMLElement;
  private readonly headerElement: HTMLElement;
  private products: Product[] = [];
  private productsStatus: ProductStatus = 'loading';
  private errorMessage: string | null = null;
  private currentRoute: string = '';
  private cartItems: CartItem[] = MOCK_CART_ITEMS;

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
    this.currentRoute = route;

    switch (route) {
      case 'about':
        this.renderPage(renderAboutUsPage((route: string) => this.navigate(route)));
        break;
      case 'catalog':
        this.renderPage(
          renderCatalogPage(this.productsStatus, this.products, this.errorMessage, () =>
            this.loadProducts(),
          ),
        );
        break;
      case 'cart':
        this.renderPage(renderCartPage(this.cartItems));
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
    this.productsStatus = 'loading';
    this.errorMessage = null;
    this.refreshCatalogIfActive();

    try {
      this.products = await fetchAllProducts();
      this.productsStatus = 'loaded';
    } catch (error) {
      this.productsStatus = 'error';
      this.errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.products = FALLBACK_PRODUCTS;
    } finally {
      this.refreshCatalogIfActive();
    }
  }

  private refreshCatalogIfActive(): void {
    if (this.currentRoute === 'catalog') {
      this.navigate('catalog');
    }
  }
}
