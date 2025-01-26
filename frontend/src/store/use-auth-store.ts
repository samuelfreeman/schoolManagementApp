import { create } from "zustand";

export const useAuthTokenStore = create<AuthToken>((set) => ({
  token: JSON.parse(localStorage.getItem("token") || "null"),
  setToken: (token: string) =>
    localStorage.setItem("token", JSON.stringify(token)),
  clearToken: () => {
    localStorage.removeItem("token");
    set({ token: "" });
  },
}));

export const useVerifyUser = create<VerifyUser>((set) => ({
  email: JSON.parse(localStorage.getItem("email") || "null"),
  setEmail: (email: string) => {
    localStorage.setItem("email", JSON.stringify(email));
    set({ email });
  },
  clearEmail: () => {
    localStorage.removeItem("email");
    set({ email: "" });
  },
}));
