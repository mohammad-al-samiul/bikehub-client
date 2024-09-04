import { Controller, useForm } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label: string;
};

const BInput = ({ type, name, label }: TInputProps) => {
  const {
    formState: { errors },
  } = useForm();

  console.log("formError", errors);
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
    </div>
  );
};

export default BInput;
