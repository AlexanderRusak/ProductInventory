import styles from "./styles.module.scss";
import { UseMutationResult } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { Table } from "@/components/Table";
import { Button } from "../Button";
import { useSubmitInventoryMutation } from "@/hooks/useSubmitInventoryMutation";
import { Inventory } from "@/services";

type InventoryListProps = {
  items: Inventory[];
  resetIventoryMutation: UseMutationResult<[], Error, void, unknown>
  openPopup: () => void,
}

export const InventoryList = React.memo(({ items, resetIventoryMutation, openPopup }: InventoryListProps) => {
  const { isPending, mutate } = useSubmitInventoryMutation();

  const handleResetClick = useCallback(() => {
    resetIventoryMutation.mutate();
  }, [resetIventoryMutation]);

  return (
    <div>
      <h3 className="flex-center">Current Inventory</h3>
      <div className={styles.tableActions}>
        <Button
          className="button"
          onClick={openPopup}
        >Add new item</Button>
        <Button
          className="button"
          onClick={handleResetClick}
          disabled={resetIventoryMutation.isPending}
        >Reset inventory</Button>
      </div>
      <Table
        columns={["Product name", "Quantity", "Actions"]}
        rows={items.map((item) => [item.name, item.quantity.toString(), "Remove"])} // Todo move to variable
        actions={[
          {
            index: 2,
            action: (payload) => {
              mutate(items.filter((item) => item.name !== payload));
            },
            actionPayloadIndex: 0,

          },
        ]} // TODo move to variable
        isSubmitting={isPending}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.items === nextProps.items;
});