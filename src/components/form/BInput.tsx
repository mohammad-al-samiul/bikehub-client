import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label: string;
};

const BInput = ({ type, name, label }: TInputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div style={{ marginBottom: "15px" }}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        rules={{
          required: `${label} is required`,
        }}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            id={name}
            className="input input-bordered input-accent w-full max-w-xs"
          />
        )}
      />
      {errorMessage && <p className="text-red-600"> {errorMessage}</p>}
    </div>
  );
};

export default BInput;
