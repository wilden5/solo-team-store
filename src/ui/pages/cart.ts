import domHelper from '../../utils/dom-helper.ts';
import type { CartItem } from '../../types/cart.ts';

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    product: {
      id: 1,
      title: 'Test Product 1',
      price: 25,
      category: 'electronics',
      image: '',
    },
    quantity: 2,
  },
  {
    product: {
      id: 2,
      title: 'Test Product 2',
      price: 20,
      category: 'beauty',
      image: '',
    },
    quantity: 1,
  },
];

export const renderCartPage = (cartItems: CartItem[]): HTMLElement => {
  const cartWrapper = domHelper.createElement('div', { className: 'cart-wrapper' });

  cartItems.forEach((item) => {
    const cartLine = domHelper.createElement('div', { className: 'cart-line' });

    const productName = domHelper.createElement('div', {
      className: 'product-name',
      textContent: item.product.title,
    });
    domHelper.appendChildToElement(cartLine, productName);

    const productPrice = domHelper.createElement('div', {
      className: 'product-price',
      textContent: `$${item.product.price}`,
    });
    domHelper.appendChildToElement(cartLine, productPrice);

    const productQuantity = domHelper.createElement('div', {
      className: 'product-quantity',
      textContent: String(item.quantity),
    });
    domHelper.appendChildToElement(cartLine, productQuantity);

    const cartLineTotalPrice = domHelper.createElement('div', {
      className: 'cart-line-total-price',
    });
    domHelper.appendChildToElement(cartLine, cartLineTotalPrice);

    const buttonsWrapper = domHelper.createElement('div', {
      className: 'cart-buttons',
      textContent: `$${item.product.price * item.quantity}`,
    });

    const increaseQuantityButton = domHelper.createElement('button', {
      className: 'inrease-quantity-button',
      textContent: '+',
      type: 'button',
    });
    increaseQuantityButton.addEventListener('click', () => {});
    domHelper.appendChildToElement(buttonsWrapper, increaseQuantityButton);

    const decreaseQuantityButton = domHelper.createElement('button', {
      className: 'decrease-quantity-button',
      textContent: '-',
      type: 'button',
    });
    decreaseQuantityButton.addEventListener('click', () => {});
    domHelper.appendChildToElement(buttonsWrapper, decreaseQuantityButton);

    const removeButton = domHelper.createElement('button', {
      className: 'remove-button',
      textContent: '-',
      type: 'button',
    });
    removeButton.addEventListener('click', () => {});
    domHelper.appendChildToElement(buttonsWrapper, removeButton);

    domHelper.appendChildToElement(cartLine, buttonsWrapper);
    domHelper.appendChildToElement(cartWrapper, cartLine);
  });

  const cartTotalPrice = domHelper.createElement('div', {
    className: 'cart-total-price',
    textContent: 'Total: $50',
  });
  domHelper.appendChildToElement(cartWrapper, cartTotalPrice);

  const cartMessage = domHelper.createElement('div', {
    className: 'cart-message',
    textContent: 'Cart is empty',
  });
  domHelper.appendChildToElement(cartWrapper, cartMessage);

  return cartWrapper;
};
