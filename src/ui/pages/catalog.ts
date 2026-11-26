import type { Product, ProductStatus } from '../../types/product.ts';
import domHelper from '../../utils/dom-helper.ts';
import { createProductCard } from '../components/product-card.ts';

const ALL_CATEGORIES = 'all-categories';

const formatCategoryLabel = (slug: string): string => {
  const withSpaces = slug.replace(/-/g, ' ');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

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

const createCategoryButtons = (
  products: Product[],
  onSelectCategory: (category: string) => void,
): HTMLElement => {
  const buttonsWrapper = domHelper.createElement('div', { className: 'catalog-buttons' });

  const categories: string[] = [
    ALL_CATEGORIES,
    ...new Set(products.map((product) => product.category)),
  ];

  categories.forEach((category) => {
    const button = domHelper.createElement('button', {
      className: `${category}-button`,
      textContent: formatCategoryLabel(category),
      type: 'button',
    });
    domHelper.appendChildToElement(buttonsWrapper, button);

    button.addEventListener('click', () => {
      onSelectCategory(category);
    });
  });

  return buttonsWrapper;
};

export const renderCatalogPage = (
  currentStatus: ProductStatus,
  products: Product[],
  errorMessage: string | null,
  onRetry: () => void,
  onAddToCart: (product: Product) => void,
  onFilterProducts: (filterValue: string) => Product[],
  onSelectCategory: (category: string) => Product[],
): HTMLElement => {
  const container = domHelper.createElement('div', { className: 'catalog-page' });

  let currentQuery = '';
  let currentCategory = ALL_CATEGORIES;
  let listWrapper = createProductList(products, onAddToCart);

  const filterInput = domHelper.createElement('input', {
    className: 'filter-input',
    type: 'text',
    placeholder: 'Search...',
    ariaLabel: 'Search',
  });
  domHelper.appendChildToElement(container, filterInput);

  const categoryButtons = createCategoryButtons(products, (selectedCategory) => {
    currentCategory = selectedCategory;
    updateProductList();
  });
  domHelper.appendChildToElement(container, categoryButtons);

  const updateProductList = (): void => {
    const byQuery = onFilterProducts(currentQuery);
    const byCategory = onSelectCategory(currentCategory);

    const combined = byQuery.filter((product) => byCategory.includes(product));

    const newListWrapper = createProductList(combined, onAddToCart);
    listWrapper.replaceWith(newListWrapper);
    listWrapper = newListWrapper;
  };

  filterInput.addEventListener('input', () => {
    currentQuery = filterInput.value;
    updateProductList();
  });

  switch (currentStatus) {
    case 'loading':
      domHelper.appendChildToElement(container, createSpinner());
      break;
    case 'error':
      domHelper.appendChildToElement(container, createErrorContent(errorMessage, onRetry));
      domHelper.appendChildToElement(container, listWrapper);
      break;
    case 'loaded':
      domHelper.appendChildToElement(container, listWrapper);
      break;
  }

  return container;
};
