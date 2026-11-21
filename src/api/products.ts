import type { Product, RawProductsResponse, RawProduct } from '../types/product.ts';

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://dummyjson.com/products?limit=0');

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data: RawProductsResponse = await response.json();

  return data.products.map(mapRawProductToProduct);
};

const mapRawProductToProduct = (raw: RawProduct): Product => {
  return {
    id: raw.id,
    title: raw.title,
    price: raw.price,
    category: raw.category,
    image: raw.thumbnail || raw.images?.[0] || '',
  };
};
