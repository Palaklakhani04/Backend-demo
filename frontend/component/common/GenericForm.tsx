"use client";
import { Formik, FormikHelpers, FormikValues } from "formik";

type Props<T> = {
  initialValues: T;
  validationSchema: any;
  onSubmit: (values: T, formikHelpers?: FormikHelpers<T>) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
};

export default function GenericForm<T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  className,
}: Props<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(values);
          }}
          className={className}
        >
          {children}
        </form>
      )}
    </Formik>
  );
}
