import { Field, Form, Formik, FormikConfig } from "formik";
import * as yup from "yup";
import { useState } from "react";

import styles from "./styles.module.scss";
import { Button } from "../../Button";
import { useCreateProductMutation } from "@/hooks/useCreateProductMutation";
import { SubmitError } from "../../SubmitError";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SuccessMessage } from "@/components/SuccessMessage";

type CreateProductProps = {
  closePopup?: () => void;
};

export const CreateProduct = ({ closePopup }: CreateProductProps) => {
  const { mutate, error, isPending } = useCreateProductMutation();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const formikConfig: FormikConfig<{ name: string }> = {
    initialValues: {
      name: "",
    },
    onSubmit: async (values, formikHelpers) => {
      mutate(values, {
        onSuccess: () => {
          formikHelpers.resetForm();
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            if (closePopup) {
              closePopup();
            }
          }, 2000);
        },
      });
      formikHelpers.setSubmitting(false);
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Product name is required"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  }; // Todo move outside

  return (
    <div className={styles.container}>
      <Formik
        {...formikConfig}
      >
        {({ errors }) =>
          <Form className={styles.addProductForm}>
            <h4>Create Product</h4>
            <Field as="input" type="text" name="name" placeholder="Please enter product name" />
            {!!errors.name && <ErrorMessage message={errors.name} />}
            {showSuccessMessage && <SuccessMessage message="Product has been added!" />}
            <Button type="submit" disabled={isPending}>Create</Button>
            <SubmitError>{error?.message}</SubmitError>
          </Form>
        }
      </Formik>
    </div>
  );
};
