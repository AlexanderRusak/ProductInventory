import { InventoryList } from "../../components/InventoryList";
import { useProductsList } from "@hooks/useProductsList";
import { useInventoryList } from "@hooks/useInventoryList";
import styles from "./styles.module.scss";
import { useResetInventoryMutation } from "@/hooks/useResetInventoryMutation";
import { Popup } from "@/components/Popup";
import { useCallback, useState } from "react";
import { AddProducts } from "@/components/Forms/AddProducts";

export const ListPage: React.FC = () => {
  const inventoryList = useInventoryList();
  const productsList = useProductsList();
  const resetIventoryMutation = useResetInventoryMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = useCallback(() => setIsPopupOpen(false), []);

  if (inventoryList.isPending || productsList.isPending) {
    return (
      <div className={styles.container}>
        <div className="flex-center text-xl">Loading...</div>
      </div>
    );
  }

  if (inventoryList.error || productsList.error) {
    const errorMessage = inventoryList.error?.message || productsList.error?.message;
    return (
      <div className={styles.container}>
        <div>Error: {errorMessage}</div>
      </div>
    );
  }

  if (!inventoryList.data || !productsList.data) {
    return (
      <div className={styles.container}>
        <div>No data</div>
        {isPopupOpen && (
          <Popup closePopup={closePopup}>Popup Content</Popup>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <InventoryList
        items={inventoryList.data}
        resetIventoryMutation={resetIventoryMutation}
        openPopup={openPopup}
      />
      {isPopupOpen && (
        <Popup closePopup={closePopup}>
          <AddProducts
            productsList={productsList.data}
            inventoryList={inventoryList.data}
            closePopup={closePopup}
          />
        </Popup>
      )}
    </div>
  );
};
