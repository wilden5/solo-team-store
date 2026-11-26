import type { Product } from '../types/product.ts';

export const filterProducts = (products: Product[], query: string): Product[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => product.title.toLowerCase().includes(normalizedQuery));
};

export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  if (category === 'all-categories') {
    return products;
  }

  return products.filter((product) => product.category === category);
};
