import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryService } from "@/services";
import { QUERY } from "@/constants/query";

export const useResetInventoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<[]>({
    mutationKey: [QUERY.RESET_INVENTORY],
    mutationFn: InventoryService.resetInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY.INVENTORY_LIST] });
    },
  });
};