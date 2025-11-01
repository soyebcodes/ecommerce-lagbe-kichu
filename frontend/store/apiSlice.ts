// api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { setCredentials, logout } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  credentials: "include", // send cookies (refresh token)
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // If token expired (401)
  if (result.error && result.error.status === 401) {
    console.log("Access token expired — refreshing...");
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken, user } = refreshResult.data as any;
      // Save new token
      api.dispatch(setCredentials({ accessToken, user }));
      // Retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "User", "Order"],
  endpoints: () => ({}),
});
