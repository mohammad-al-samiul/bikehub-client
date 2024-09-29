import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      invalidatesTags: ["rental"],
      query: (paymentInfo) => ({
        url: "/payment/create-payment",
        method: "POST",
        body: paymentInfo,
      }),
    }),
    getPaymentByUser: builder.query({
      query: () => ({
        url: "/payment/get-payment",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useGetPaymentByUserQuery } =
  paymentApi;
