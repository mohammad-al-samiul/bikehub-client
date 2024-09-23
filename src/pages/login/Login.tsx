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
import { Helmet } from "react-helmet";

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
    email: "alsamiul123@gmail.com",
    password: "password123",
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      email: data?.email,
      password: data?.password,
    };

    try {
      const toastId = toast.loading("Logged in");
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
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full max-w-xs">
        <BForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <BInput type="email" name="email" label="Email" />
          <BInput type="password" name="password" label="Password" />
          <BSubmit value="Login" />
        </BForm>
      </div>
    </div>
  );
};

export default LoginPage;
