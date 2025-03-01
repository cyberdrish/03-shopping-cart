import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./api-mock/products-api";

export function useProducts() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return { isLoading, products };
}
