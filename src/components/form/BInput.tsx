import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label: string;
  required?: boolean;
};

const BInput = ({ type, name, label, required = false }: TInputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="w-full" style={{ marginBottom: "15px" }}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        defaultValue=""
        rules={{
          required: required ? `${label} is required` : false, // Conditional required validation
        }}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            id={name}
            className="input input-bordered input-accent w-full"
          />
        )}
      />
      {errorMessage && <p className="text-red-600"> {errorMessage}</p>}
    </div>
  );
};

export default BInput;
