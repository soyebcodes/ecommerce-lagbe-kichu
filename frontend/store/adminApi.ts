// store/adminApi.ts
import { apiSlice } from "./apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/admin/orders",
      providesTags: ["Order"],
    }),
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),
    banUser: builder.mutation({
      query: (id: string) => ({
        url: `/admin/users/ban/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    unbanUser: builder.mutation({
      query: (id: string) => ({
        url: `/admin/users/unban/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetAllUsersQuery,
  useBanUserMutation,
  useUnbanUserMutation,
} = adminApi;
