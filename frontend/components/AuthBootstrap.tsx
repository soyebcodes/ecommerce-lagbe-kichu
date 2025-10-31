"use client";
import { useEffect } from "react";
import { useRefreshMutation } from "@/store/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";

export default function AuthBootstrap() {
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res: any = await refresh().unwrap();
        const { accessToken, user } = res.data ?? res;
        if (accessToken) dispatch(setCredentials({ accessToken, user }));
      } catch {}
    })();
  }, [refresh, dispatch]);

  return null;
}
