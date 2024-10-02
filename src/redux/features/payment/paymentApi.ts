import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      invalidatesTags: ["payment"],
      query: (paymentInfo) => ({
        url: "/payment/create-payment",
        method: "POST",
        body: paymentInfo,
      }),
    }),
    getPaymentByUser: builder.query({
      providesTags: ["rental"],
      query: () => ({
        url: "/payment/get-payment",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useGetPaymentByUserQuery } =
  paymentApi;
