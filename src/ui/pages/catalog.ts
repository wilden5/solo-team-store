import type { Product, ProductStatus } from '../../types/product.ts';
import domHelper from '../../utils/dom-helper.ts';
import { createProductCard } from '../components/product-card.ts';

const createSpinner = (): HTMLElement => {
  return domHelper.createElement('div', {
    className: 'catalog-spinner',
    textContent: 'Loading products...',
  });
};

const createErrorContent = (errorMessage: string | null, onRetry: () => void): HTMLElement => {
  const wrapper = domHelper.createElement('div', { className: 'catalog-error' });

  const message = domHelper.createElement('p', {
    className: 'catalog-error-message',
    textContent: errorMessage
      ? `API is unavailable (${errorMessage}). Showing cached catalog.`
      : 'API is unavailable. Showing cached catalog.',
  });
  domHelper.appendChildToElement(wrapper, message);

  const retryButton = domHelper.createElement('button', {
    className: 'catalog-retry-button',
    textContent: 'Retry',
    type: 'button',
  });
  retryButton.addEventListener('click', onRetry);
  domHelper.appendChildToElement(wrapper, retryButton);

  return wrapper;
};

const createProductList = (
  products: Product[],
  onAddToCart: (product: Product) => void,
): HTMLElement => {
  const productCardsWrapper = domHelper.createElement('div', { className: 'products-wrapper' });

  products.forEach((product) => {
    const card = createProductCard(product, onAddToCart);
    domHelper.appendChildToElement(productCardsWrapper, card);
  });

  return productCardsWrapper;
};

export const renderCatalogPage = (
  currentStatus: ProductStatus,
  products: Product[],
  errorMessage: string | null,
  onRetry: () => void,
  onAddToCart: (product: Product) => void,
): HTMLElement => {
  const container = domHelper.createElement('div', { className: 'catalog-page' });
  const productCardsWrapper = domHelper.createElement('div', { className: 'products-wrapper' });

  switch (currentStatus) {
    case 'loading':
      domHelper.appendChildToElement(container, createSpinner());
      break;
    case 'error':
      domHelper.appendChildToElement(container, createErrorContent(errorMessage, onRetry));
      domHelper.appendChildToElement(container, createProductList(products, onAddToCart));
      domHelper.appendChildToElement(container, productCardsWrapper);
      break;
    case 'loaded':
      domHelper.appendChildToElement(container, createProductList(products, onAddToCart));
      domHelper.appendChildToElement(container, productCardsWrapper);
  }

  return container;
};
