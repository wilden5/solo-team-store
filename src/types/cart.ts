import type { Product } from './product.ts';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
}
