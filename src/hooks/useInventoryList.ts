import { useQuery } from "@tanstack/react-query";
import { Inventory, InventoryService } from "@/services";
import { QUERY } from "@/constants/query";

export const useInventoryList = () => {
  return useQuery<Inventory[]>({
    queryKey: [QUERY.INVENTORY_LIST],
    queryFn: InventoryService.getInventoryList,
  });
};