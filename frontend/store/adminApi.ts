import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/admin",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery,
  tagTypes: ["User", "Order"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    banUser: builder.mutation({
      query: (userId: string) => ({
        url: `/users/${userId}/ban`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetAllUsersQuery, useBanUserMutation, useGetAllOrdersQuery } =
  adminApi;
