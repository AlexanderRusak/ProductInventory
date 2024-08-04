import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryService, Product } from "@/services";
import { QUERY } from "@/constants/query";

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY.CREATE_PRODUCT],
    mutationFn: (payload: Product) => InventoryService.createProduct({ ...payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY.PRODUCTS_LIST] });
    },
  });
};