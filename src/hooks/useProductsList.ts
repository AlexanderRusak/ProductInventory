import { useQuery } from "@tanstack/react-query";
import { InventoryService, Product } from "@/services";
import { QUERY } from "@/constants/query";

export const useProductsList = () => {
  return useQuery<Product[]>({ queryKey: [QUERY.PRODUCTS_LIST], queryFn: InventoryService.getProductsList });
};