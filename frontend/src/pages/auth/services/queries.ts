import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  adminLogin,
  forgotPassword,
  resetPassword,
  verifyAdminLogin,
} from "./api";
import { toast } from "@/hooks/use-toast";
import { useAuthTokenStore, useVerifyUser } from "@/store/use-auth-store";

export const useLoginUser = () => {
  const navigate = useNavigate();
  const { setEmail } = useVerifyUser();
  return useMutation({
    mutationFn: async ({ data }: { data: LoginAdmin }) => {
      try {
        setEmail(data.email);
        const response = await adminLogin(data);
        return response;
      } catch (error) {
        throw error as Error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Login successful",
        description: "Please check your email for OTP",
        duration: 5000,
      });
      navigate(`/admin/otp-verify`);
    },
    onError: (error: Errors) => {
      const { message, status } = error.response.data;
      toast({
        title: status.toString(),
        description: message,
      });
    },
  });
};

export const useVerifyLogin = () => {
  const navigate = useNavigate();
  // const { clearEmail } = useVerifyUser();
  const { setToken } = useAuthTokenStore();
  return useMutation({
    mutationFn: async (data: { email: string; otp: string }) => {
      try {
        const response = await verifyAdminLogin(data);
        return response;
      } catch (error) {
        throw error as Error;
      }
    },
    onSuccess: (data) => {
      const { token } = data;
      setToken(token);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
        duration: 5000,
      });
      navigate(`/admin`);
    },
    onError: (error: Errors) => {
      const { message, status } = error.response.data;
      toast({
        title: status.toString(),
        description: message,
      });
    },
  });
};

export const useForgotPassword = () => {
  const navigate = useNavigate();
  // const { setEmail } = useForgotAuthStore();
  return useMutation({
    mutationFn: async (data: ForgotPassword) => {
      // setEmail(data.email);
      try {
        const response = await forgotPassword(data.email);
        return response;
      } catch (error) {
        throw error as Error;
      }
    },
    onSuccess: () => {
      toast({
        title: "OTP sent successfully. ",
        description: "Please check your email",
        duration: 5000,
      });
      navigate("/reset-password");
    },
    onError: (error: Errors) => {
      const { message, status } = error.response.data;
      toast({
        title: status.toString(),
        description: message,
      });
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: ResetPassword) => {
      try {
        const response = await resetPassword(data);
        return response;
      } catch (error) {
        throw error as Error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Password reset successful. ",
        description: "Please login to continue",
        duration: 5000,
      });
      navigate("/login");
    },
    onError: (error: Errors) => {
      const { message, status } = error.response.data;
      toast({
        title: status.toString(),
        description: message,
      });
    },
  });
};
