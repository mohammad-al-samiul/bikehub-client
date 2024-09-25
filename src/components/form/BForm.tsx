import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  defaultValues?: Record<string, any> | undefined;
};

const BForm = ({ onSubmit, children, defaultValues }: TFormProps) => {
  // Pass the defaultValues to useForm
  const methods = useForm({
    defaultValues, // Set the default values here
  });

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset(); // Reset form after submission
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default BForm;
