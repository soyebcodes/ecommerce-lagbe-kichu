import { apiSlice } from "./apiSlice";

export const sellerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellerOrders: builder.query({
      query: () => "/seller/orders",
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/seller/orders/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetSellerOrdersQuery, useUpdateOrderStatusMutation } =
  sellerApi;
