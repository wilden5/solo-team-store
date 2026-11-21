import type { Product } from '../types/product.ts';
import type { CartItem } from '../types/cart.ts';

export const addToCart = (cartItems: CartItem[], product: Product): CartItem[] => {
  const isProductInCart = cartItems.some((item) => item.product.id === product.id);

  if (isProductInCart) {
    return cartItems.map((item) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  return [...cartItems, { product, quantity: 1 }];
};
