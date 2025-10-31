"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return {
    user: auth.user,
    accessToken: auth.accessToken,
    isAuthenticated: !!auth.accessToken,
    role: auth.user?.role || null,
  };
};
