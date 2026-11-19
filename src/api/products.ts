import type { ProductsResponse } from '../types/product.ts';

export const fetchAllProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch('https://dummyjson.com/products?limit=0');

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
};
