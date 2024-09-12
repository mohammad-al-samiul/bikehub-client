import { FieldValues, SubmitHandler } from "react-hook-form";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import BSubmit from "../../components/form/BSubmit";
import { useSignupMutation } from "../../redux/features/auth/authApi";

import { useAppDispatch } from "../../redux/hook";

import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

export type TUser = {
  email: string;
  password: string;
};

const Signup = () => {
  const [signup] = useSignupMutation();
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      phone: parseInt(data?.phone),
      address: data?.address,
    };

    const toastId = toast.loading("Signing up");
    const res = await signup(userInfo).unwrap();
    if (res.success) {
      dispatch(logOut());
      toast.success("Signed up successful", {
        id: toastId,
        duration: 2000,
      });
      return navigate("/sign-up-success", { replace: true });
    }
  };

  return (
    <div>
      <div className="w-full max-w-xs">
        <BForm onSubmit={onSubmit}>
          <BInput type="text" name="name" label="Name" />
          <BInput type="email" name="email" label="Email" />
          <BInput type="password" name="password" label="Password" />
          <BInput type="number" name="phone" label="Phone" />
          <BInput type="text" name="address" label="Address" />
          <BSubmit value="Login" />
        </BForm>
        <div className="mt-6">
          <p>
            Already have an account?{" "}
            <Link
              className="underline font-medium hover:text-accentColor duration-200"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
