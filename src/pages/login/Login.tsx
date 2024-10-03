import { FieldValues, SubmitHandler } from "react-hook-form";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import BSubmit from "../../components/form/BSubmit";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Image } from "@chakra-ui/react";
import loginImage from "../../assets/images/loginImage.png";
import logoImage from "../../assets/images/logo.png";
export type TUser = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  let navigate = useNavigate();
  let location = useLocation();

  const defaultValues = {
    email: "",
    password: "",
  };

  /*
    email: "alsamiul123@gmail.com",
    password: "password123",

  */
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      email: data?.email,
      password: data?.password,
    };

    let toastId;
    try {
      toastId = toast.loading("Logged in...");
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.token);
      const { role }: any = user;
      //console.log("login user", user);
      dispatch(
        setUser({
          user,
          token: res.token,
        })
      );

      if (location?.state?.targetPath) {
        return navigate(location?.state?.targetPath, { replace: true });
      }

      toast.success("Logged in successful", { id: toastId, duration: 2000 });
      return navigate(`/${role}/profile`, { replace: true });
    } catch (error) {
      toast.error("Invalid credentials, please try again.", {
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
              Sign in to continue using Bikehub
            </p>

            <div className="w-full max-w-xs">
              <BForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <BInput type="email" name="email" label="Email" />
                <BInput type="password" name="password" label="Password" />
                <BSubmit value="Login" />
              </BForm>
            </div>
          </div>
          <div className="w-1/2 max-sm:w-5/6 h-[600px] max-sm:h-[400px] flex items-center self-end max-sm:self-center bg-gradient-to-t from-teal-200 to-teal-700 rounded-2xl m-4 ">
            <img src={loginImage} alt="bike" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
