import domHelper from '../../utils/dom-helper.ts';
import type { CartItem } from '../../types/cart.ts';
import {
  calculateCartTotals,
  decreaseItemQuantity,
  increaseItemQuantity,
  isValidPromoCode,
} from '../../core/cart.ts';

export const renderCartPage = (
  initialCartItems: CartItem[],
  onRemove: (item: CartItem) => CartItem[],
): HTMLElement => {
  let currentItems = initialCartItems;
  let appliedPromoCode: string | null = null;

  const cartDiscount = domHelper.createElement('div', {
    className: 'cart-discount',
  });

  const cartWrapper = domHelper.createElement('div', { className: 'cart-wrapper' });

  const cartTotalPrice = domHelper.createElement('div', {
    className: 'cart-total-price',
  });

  const cartMessage = domHelper.createElement('div', {
    className: 'cart-message',
    textContent: 'Cart is empty',
  });

  const updateCartSummary = (): void => {
    const isEmpty = currentItems.length === 0;
    const { discountAmount, finalTotal } = calculateCartTotals(currentItems, appliedPromoCode);

    cartMessage.style.display = isEmpty ? 'block' : 'none';
    cartTotalPrice.style.display = isEmpty ? 'none' : 'block';

    if (!isEmpty && discountAmount > 0) {
      cartDiscount.style.display = 'block';
      cartDiscount.textContent = `Discount (10%): -$${discountAmount.toFixed(2)}`;
    } else {
      cartDiscount.style.display = 'none';
    }

    cartTotalPrice.textContent = `Total: $${finalTotal.toFixed(2)}`;
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
      textContent: `$${(item.product.price * item.quantity).toFixed(2)}`,
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

  domHelper.appendChildToElement(cartWrapper, cartDiscount);
  domHelper.appendChildToElement(cartWrapper, cartTotalPrice);
  domHelper.appendChildToElement(cartWrapper, cartMessage);

  updateCartSummary();
  createCouponMarkup(cartWrapper, (validCode) => {
    appliedPromoCode = validCode;
    updateCartSummary();
  });

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

const createCouponMarkup = (wrapper: HTMLElement, onApplyPromo: (code: string) => void): void => {
  const couponWrapper = domHelper.createElement('div', { className: 'coupon-wrapper' });
  const couponInput = domHelper.createElement('input', {
    className: 'coupon-input',
    type: 'text',
  });
  domHelper.appendChildToElement(couponWrapper, couponInput);

  const applyCouponButton = domHelper.createElement('button', {
    className: 'apply-coupon',
    textContent: 'Apply',
    type: 'button',
  });
  domHelper.appendChildToElement(couponWrapper, applyCouponButton);

  const couponMessage = domHelper.createElement('div', {
    className: 'coupon-message',
  });
  domHelper.appendChildToElement(couponWrapper, couponMessage);

  applyCouponButton.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();

    if (isValidPromoCode(code)) {
      couponMessage.textContent = 'Promo code SALE10 applied!';
      onApplyPromo(code);
    } else {
      couponMessage.textContent = 'Invalid promo code';
    }
  });

  domHelper.appendChildToElement(wrapper, couponWrapper);
};
