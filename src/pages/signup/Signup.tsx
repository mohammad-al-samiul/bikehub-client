import { FieldValues, SubmitHandler } from "react-hook-form";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import BSubmit from "../../components/form/BSubmit";
import { useSignupMutation } from "../../redux/features/auth/authApi";

import { useAppDispatch } from "../../redux/hook";

import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { Image } from "@chakra-ui/react";
import logoImage from "../../assets/images/logo.png";
import signupImage from "../../assets/images/signupImage.png";

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

    let toastId;
    try {
      toastId = toast.loading("Signing up");
      const res = await signup(userInfo).unwrap();
      if (res.success) {
        dispatch(logOut());
        toast.success("Signed up successful", {
          id: toastId,
          duration: 2000,
        });
        return navigate("/sign-up-success", { replace: true });
      }
    } catch (error) {
      toast.error("Error during sign up, please try again.", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div>
      <div className="min-h-[90%] flex justify-center items-center ">
        <div className="max-w-screen-lg bg-gray-50 m-5 shadow-xl rounded-2xl flex justify-between items-center max-sm:flex-col">
          <div className="w-1/2 max-sm:w-full flex flex-col py-4 items-center gap-5">
            <Image src={logoImage} width={"25%"} />

            <p className="text-sm font-normal text-gray-500">
              Sign up to continue using Bikehub
            </p>

            <div className="w-full max-w-xs">
              <BForm onSubmit={onSubmit}>
                <BInput type="text" name="name" label="Name" />
                <BInput type="email" name="email" label="Email" />
                <BInput type="password" name="password" label="Password" />
                <BInput type="number" name="phone" label="Phone" />
                <BInput type="text" name="address" label="Address" />
                <BSubmit value="Sign Up" />
              </BForm>

              <div className="mt-6">
                <p>
                  Already have an account?{" "}
                  <Link
                    className="font-bold text-teal-500 hover:text-accent duration-200"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 max-sm:w-5/6 h-[600px] max-sm:h-[400px] flex items-center self-end max-sm:self-center bg-gradient-to-t from-teal-200 to-teal-700 rounded-2xl m-4 ">
            <img src={signupImage} alt="bike" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
