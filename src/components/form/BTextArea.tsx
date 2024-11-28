import { Controller, useFormContext } from "react-hook-form";

type TTextAreaProps = {
  name: string;
  label: string;
  required?: boolean; // New required prop
};

const BTextArea = ({ name, label, required = false }: TTextAreaProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  // Error message based on validation
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="w-full">
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        defaultValue=""
        rules={{
          required: required ? `${label} is required` : false, // Conditional required validation
        }}
        render={({ field }) => (
          <textarea
            {...field}
            id={name}
            className={`block textarea textarea-bordered textarea-accent w-full ${
              errorMessage ? "border-red-600" : ""
            }`} // Add red border if error
            rows={3}
          />
        )}
      />
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}{" "}
      {/* Show error message if validation fails */}
    </div>
  );
};

export default BTextArea;
