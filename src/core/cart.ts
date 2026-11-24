import type { Product } from '../types/product.ts';
import type { CartItem, CartTotals } from '../types/cart.ts';

export const addToCart = (cartItems: CartItem[], product: Product): CartItem[] => {
  const isProductInCart = cartItems.some((item) => item.product.id === product.id);

  if (isProductInCart) {
    return cartItems.map((item) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  return [...cartItems, { product, quantity: 1 }];
};

export const increaseItemQuantity = (item: CartItem): void => {
  item.quantity = item.quantity + 1;
};

export const decreaseItemQuantity = (item: CartItem): void => {
  if (item.quantity > 1) {
    item.quantity = item.quantity - 1;
  }
};

export const removeFromCart = (item: CartItem, cart: CartItem[]): CartItem[] => {
  return cart.filter((cartItem) => cartItem.product.id !== item.product.id);
};

export const calculateCartTotals = (
  cartItems: CartItem[],
  appliedPromoCode: string | null,
): CartTotals => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountRate = appliedPromoCode === 'SALE10' ? 0.1 : 0;
  const discountAmount = subtotal * discountRate;
  const finalTotal = subtotal - discountAmount;

  return {
    subtotal,
    discountAmount,
    finalTotal,
  };
};

export const isValidPromoCode = (code: string): boolean => {
  return code.trim().toUpperCase() === 'SALE10';
};
