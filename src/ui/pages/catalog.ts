import type { Product, ProductStatus } from '../../types/product.ts';
import domHelper from '../../utils/dom-helper.ts';

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

const createProductContainer = (products: Product[]): HTMLElement => {
  const wrapper = domHelper.createElement('div', { className: 'products-wrapper' });

  products.forEach((product) => {
    const productCard = domHelper.createElement('div', { className: `product-card` });
    productCard.dataset.productId = String(product.id);

    const productTitle = domHelper.createElement('h3', {
      className: 'product-title',
      textContent: product.title,
    });
    domHelper.appendChildToElement(productCard, productTitle);

    const productPrice = domHelper.createElement('div', {
      className: 'product-price',
      textContent: `$${product.price}`,
    });
    domHelper.appendChildToElement(productCard, productPrice);

    const productCategory = domHelper.createElement('div', {
      className: 'product-category',
      textContent: product.category,
    });
    domHelper.appendChildToElement(productCard, productCategory);

    const productImage = domHelper.createElement('img', {
      className: 'product-image',
      src: product.image,
      alt: `Product ${product.title}`,
    });
    domHelper.appendChildToElement(productCard, productImage);

    domHelper.appendChildToElement(wrapper, productCard);
  });

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
      domHelper.appendChildToElement(container, createProductContainer(products));
      break;
    case 'loaded':
      domHelper.appendChildToElement(container, createProductContainer(products));
  }

  return container;
};
