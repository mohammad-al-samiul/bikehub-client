import { FieldValues, SubmitHandler } from "react-hook-form";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import BSubmit from "../../components/form/BSubmit";

const LoginPage = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("formData", data);
  };

  const defaultValues = {
    email: "alsamiul123@gmail.com",
    password: "123456",
  };

  return (
    <div className="w-full max-w-xs">
      <BForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <BInput type="email" name="email" label="Email" />
        <BInput type="password" name="password" label="Password" />
        <BSubmit value="Login" />
      </BForm>
    </div>
  );
};

export default LoginPage;
