import { FieldValues, SubmitHandler } from "react-hook-form";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import BSubmit from "../../components/form/BSubmit";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Image } from "@chakra-ui/react";
import logoImage from "../../assets/images/logo.png";
import { HiArrowLeftCircle } from "react-icons/hi2";
import { Button, Tooltip } from "antd";

export type TUser = {
  email: string;
  password: string;
};

const customColor = "#108ee9";

const userText = "email: jamal@gmail.com | password: 123456";
const adminText = "email: alsamiul123@gmail.com | password: password123";

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
    <div className=" min-h-[90%] flex justify-center items-center">
      <div className=" relative max-w-screen-lg bg-gray-50 m-5 shadow-xl rounded-2xl flex justify-between items-center max-sm:flex-col">
        <div className="w-1/2 max-sm:w-full flex flex-col py-4 items-center gap-5">
          <Link className="text-3xl" to={"/"}>
            <div className="absolute top-5 left-5 text-5xl">
              <HiArrowLeftCircle className="text-teal-500" />
            </div>
          </Link>
          <Image src={logoImage} width={"25%"} />
          <p className="text-sm font-normal text-gray-700">
            Sign in to continue using Bikehub
          </p>
          <p className="font-bold text-gray-700">Credential</p>
          <div className="flex gap-2">
            <Tooltip color={customColor} placement="bottom" title={userText}>
              <Button className="text-teal-600 ">User Credentials</Button>
            </Tooltip>
            <Tooltip placement="bottom" color={customColor} title={adminText}>
              <Button color={customColor} className="text-teal-600 ">
                Admin Credentials
              </Button>
            </Tooltip>
          </div>

          <div className="w-full px-4 lg:px-10">
            <BForm onSubmit={onSubmit} defaultValues={defaultValues}>
              <BInput type="email" name="email" label="Email" />
              <BInput type="password" name="password" label="Password" />
              <BSubmit value="Login" />
            </BForm>
          </div>
          <div className="lg:my-6">
            <p className="text-center">
              Don't have an account?{" "}
              <Link
                className="font-bold text-teal-500 hover:text-accent duration-200"
                to={"/signup"}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className="w-1/2 max-sm:w-5/6 h-[600px] max-sm:h-[400px] flex items-center self-end max-sm:self-center bg-gradient-to-t from-teal-200 to-teal-700 rounded-2xl m-4">
          <img
            src={`https://res.cloudinary.com/dt9bjjzrd/image/upload/v1732599550/dq721lpp7nszbdm7wxho.png`}
            alt="bike"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
