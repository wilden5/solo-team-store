import domHelper from '../../utils/dom-helper.ts';
import type { Product } from '../../types/product.ts';

export const createProductCard = (products: Product[], wrapper: HTMLElement): HTMLElement => {
  products.forEach((product) => {
    const productCard = domHelper.createElement('div', { className: 'product-card' });
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

    const addToCartButton = domHelper.createElement('button', {
      className: 'add-to-cart-button',
      textContent: 'Add to cart',
      type: 'button',
    });
    addToCartButton.addEventListener('click', () => {});
    domHelper.appendChildToElement(productCard, addToCartButton);

    domHelper.appendChildToElement(wrapper, productCard);
  });

  return wrapper;
};
