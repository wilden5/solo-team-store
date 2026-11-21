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

export const renderCatalogPage = (
  currentStatus: ProductStatus,
  products: Product[],
  errorMessage: string | null,
  onRetry: () => void,
): HTMLElement => {
  const container = domHelper.createElement('div', { className: 'catalog-page' });

  switch (currentStatus) {
    case 'loading':
      domHelper.appendChildToElement(container, createSpinner());
      break;
    case 'error':
      domHelper.appendChildToElement(container, createErrorContent(errorMessage, onRetry));
      domHelper.appendChildToElement(container, createProductCard(products));
      break;
    case 'loaded':
      domHelper.appendChildToElement(container, createProductCard(products));
  }

  return container;
};
