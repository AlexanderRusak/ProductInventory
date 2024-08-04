import { useSubmitInventoryMutation } from "@/hooks/useSubmitInventoryMutation";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Table } from "../../Table";
import { Field, Form, Formik, FormikConfig } from "formik";
import * as yup from "yup";
import { Button } from "../../Button";
import { Popup } from "../../Popup";
import { CreateProduct } from "../CreateProduct";
import styles from "./styles.module.scss";
import { Product, Inventory } from "@/services";
import { ErrorMessage } from "@/components/ErrorMessage";

type AddProductsProps = {
  productsList: Product[];
  inventoryList: Inventory[];
  closePopup: () => void;
}

export const AddProducts = ({
  productsList,
  inventoryList,
  closePopup,
}: AddProductsProps) => {
  const { mutate, isPending, isSuccess, error } = useSubmitInventoryMutation();

  const [addProducts, setAddProducts] = useState<Inventory[]>(inventoryList ?? []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openProductPopup = useCallback(() => setIsPopupOpen(true), []);
  const closeProductPopup = useCallback(() => setIsPopupOpen(false), []);

  const formikConfig: FormikConfig<{ product: string, quantity: number }> = {
    initialValues: {
      product: "",
      quantity: 0,
    },
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      if (addProducts.find((product) => product.name === values.product)) {
        setAddProducts(prev => {
          return prev.map((product) => {
            if (product.name === values.product) {
              return {
                ...product,
                quantity: product.quantity + values.quantity,
              };
            }
            return product;
          });
        });
      } else {
        setAddProducts(prev => [...prev, { name: values.product, quantity: values.quantity }]);
        formikHelpers.resetForm();
        formikHelpers.setSubmitting(false);
      }
    },
    validationSchema: yup.object().shape({
      product: yup.string().required("Product is required").notOneOf([""], "Product is required"),
      quantity: yup.number().required("Quantity is required").min(1, "Quantity should be more than 0").integer("Quantity should be an integer"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  };

  const handleSubmitInventory = useCallback(() => {
    mutate(addProducts);
  }, [addProducts, mutate]);

  useEffect(() => {
    if (isSuccess) {
      setAddProducts([]);
      closePopup();
    }
  }, [isSuccess, closePopup]);

  const tableRows = addProducts.map((product) => [product.name, product.quantity, "Remove"]);

  const productListElement = useMemo(() => productsList.map(({ name }, key) => (
    <option key={name + "_" + key} value={name}>{name}</option>
  )), [productsList]);

  const errorMessageElement = useMemo(() => !!error && <ErrorMessage message={error.message} />, [error]);

  const productPopUpElement = useMemo(() => isPopupOpen && (
    <Popup closePopup={closeProductPopup}>
      <CreateProduct closePopup={closeProductPopup} />
    </Popup>
  ), [closeProductPopup, isPopupOpen]);

  const handleRemoveProduct = useCallback((name: string) => {
    setAddProducts(prev => prev.filter((product) => product.name !== name));
  }, []);

  return (
    <div className={styles.container}>
      <Formik
        {...formikConfig}
      >
        {({ errors, values }) =>
          <Form className={styles.inventoryForm}>
            <h3>Add products</h3>
            <div className={styles.field}>
              <Field as="select" name="product" >
                <option value="">Select a product</option>
                {productListElement}
              </Field>
              {errors.product && <div className={styles.validationError}>{errors.product}</div>}
            </div>
            <div className={styles.field}>
              <Field as="input" type="number" name="quantity" />
              {errors.quantity && <div className={styles.validationError}>{errors.quantity}</div>}
            </div>
            <Button type="submit" disabled={isPending}>Add Product {values.product}</Button>
          </Form>
        }
      </Formik>
      <Button onClick={openProductPopup} disabled={isPending} className="mb-2 self-end">Add new product</Button>
      <div className={styles.wrapper}>
        <Table
          columns={["Product", "Quantity", "Actions"]}
          rows={tableRows}
          actions={[
            {
              index: 2,
              action: handleRemoveProduct,
              actionPayloadIndex: 0,
            },
          ]}
          isSubmitting={isPending}
        />
      </div>
      <Button
        onClick={handleSubmitInventory}
        disabled={isPending}
      >
        Submit
      </Button>
      {errorMessageElement}
      {productPopUpElement}
    </div>
  );
};
