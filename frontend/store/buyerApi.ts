import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/orders",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const buyerApi = createApi({
  reducerPath: "buyerApi",
  baseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => "/",
      providesTags: ["Order"],
    }),
    cancelOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `/${orderId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetMyOrdersQuery, useCancelOrderMutation } = buyerApi;
