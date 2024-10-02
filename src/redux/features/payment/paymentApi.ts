import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      invalidatesTags: ["rental"],
      query: (paymentInfo) => ({
        url: "/create-payment",
        method: "POST",
        body: paymentInfo,
      }),
    }),
    getPaymentByUser: builder.query({
      providesTags: ["rental"],
      query: () => ({
        url: "/get-payment",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useGetPaymentByUserQuery } =
  paymentApi;
