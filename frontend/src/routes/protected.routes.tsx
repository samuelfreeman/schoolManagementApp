import { useVerifyUser } from "@/store/use-auth-store";
import { Navigate, Outlet } from "react-router-dom";

export const AdminProtected = () => {
  // const { user,token } = useVerifyUser();
  // if (!user && !token) {
  //     return <Navigate to="/" replace />;
  // }
  // return <Outlet />;
};

export const VerifyUserOTPProtected = () => {
  const { email } = useVerifyUser();

  if (!email) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
