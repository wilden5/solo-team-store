import type { Product } from '../types/product.ts';
import type { CartItem } from '../types/cart.ts';

export const addToCart = (product: Product, cartItems: CartItem[]): void => {
  const existingItem = cartItems.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ product, quantity: 1 });
  }
};
