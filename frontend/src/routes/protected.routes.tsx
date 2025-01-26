import { useVerifyUser } from "@/store/use-auth-store";
import { Navigate, Outlet } from "react-router-dom";

export const AdminProtectedPage = () => {
  // Verify if user is logged in by checking if token and email is set
  // const { token } = useAuthTokenStore();

  // Email is working as a token here
  const { email } = useVerifyUser();

  if (!email) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export const VerifyUserOTPProtected = () => {
  // This is for when the user is logged in and tries to access the OTP verification page
  const { email } = useVerifyUser();

  if (!email) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
