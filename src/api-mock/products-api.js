import products from "./products.json";

export const fetchProducts = () => {
  // Simulate an API call by returning the products with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 2000);
  });
};
