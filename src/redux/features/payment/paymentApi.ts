import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      invalidatesTags: ["payment"],
      query: (paymentInfo) => ({
        url: "/create-payment",
        method: "POST",
        body: paymentInfo,
      }),
    }),
    getPayment: builder.query({
      providesTags: ["payment"],
      query: () => ({
        url: "/get-payments",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useGetPaymentQuery } = paymentApi;
