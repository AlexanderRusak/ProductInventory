import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Inventory, InventoryService } from "@/services";
import { QUERY } from "@/constants/query";

export const useSubmitInventoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY.SUBMIT_INVENTORY],
    mutationFn: (payload: Inventory[]) => InventoryService.submitInventory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY.INVENTORY_LIST] });
    },
  });
};