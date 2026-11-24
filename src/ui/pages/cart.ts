import domHelper from '../../utils/dom-helper.ts';
import type { CartItem } from '../../types/cart.ts';
import { decreaseItemQuantity, increaseItemQuantity } from '../../core/cart.ts';

export const renderCartPage = (
  initialCartItems: CartItem[],
  onRemove: (item: CartItem) => CartItem[],
): HTMLElement => {
  let currentItems = initialCartItems;

  const cartWrapper = domHelper.createElement('div', { className: 'cart-wrapper' });

  const updateCartSummary = (): void => {
    const total = currentItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    cartTotalPrice.textContent = `Total: $${total.toFixed(2)}`;

    cartMessage.style.display = currentItems.length === 0 ? 'block' : 'none';
    cartTotalPrice.style.display = currentItems.length === 0 ? 'none' : 'block';
  };

  initialCartItems.forEach((item) => {
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
      textContent: `$${item.product.price * item.quantity}`,
    });
    domHelper.appendChildToElement(cartLine, cartLineTotalPrice);

    const buttonsWrapper = domHelper.createElement('div', {
      className: 'cart-buttons',
    });

    const increaseQuantityButton = domHelper.createElement('button', {
      className: 'increase-quantity-button',
      textContent: '+',
      type: 'button',
    });
    increaseQuantityButton.addEventListener('click', () => {
      increaseItemQuantity(item);
      updateRowUI(item, productQuantity, cartLineTotalPrice);
      updateCartSummary();
    });
    domHelper.appendChildToElement(buttonsWrapper, increaseQuantityButton);

    const decreaseQuantityButton = domHelper.createElement('button', {
      className: 'decrease-quantity-button',
      textContent: '-',
      type: 'button',
    });
    decreaseQuantityButton.addEventListener('click', () => {
      decreaseItemQuantity(item);
      updateRowUI(item, productQuantity, cartLineTotalPrice);
      updateCartSummary();
    });
    domHelper.appendChildToElement(buttonsWrapper, decreaseQuantityButton);

    const removeButton = domHelper.createElement('button', {
      className: 'remove-button',
      textContent: 'Remove',
      type: 'button',
    });
    removeButton.addEventListener('click', () => {
      cartLine.remove();
      currentItems = onRemove(item);
      updateCartSummary();
    });
    domHelper.appendChildToElement(buttonsWrapper, removeButton);

    domHelper.appendChildToElement(cartLine, buttonsWrapper);
    domHelper.appendChildToElement(cartWrapper, cartLine);
  });

  const totalPrice: number = initialCartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const cartTotalPrice = domHelper.createElement('div', {
    className: 'cart-total-price',
    textContent: `Total: $${totalPrice}`,
  });
  domHelper.appendChildToElement(cartWrapper, cartTotalPrice);

  const cartMessage = domHelper.createElement('div', {
    className: 'cart-message',
    textContent: 'Cart is empty',
  });
  domHelper.appendChildToElement(cartWrapper, cartMessage);

  updateCartSummary();

  return cartWrapper;
};

const updateRowUI = (
  item: CartItem,
  quantityElement: HTMLDivElement,
  cartLineTotalPrice: HTMLDivElement,
): void => {
  quantityElement.textContent = String(item.quantity);
  cartLineTotalPrice.textContent = `$${(item.product.price * item.quantity).toFixed(2)}`;
};
