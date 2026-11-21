import type { CartItem } from '../types/cart.ts';

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
