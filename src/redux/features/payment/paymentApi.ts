import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      invalidatesTags: ["rental", "payment"],
      query: (paymentInfo) => ({
        url: "/create-payment",
        method: "POST",
        body: paymentInfo,
      }),
    }),
    getPaymentByUser: builder.query({
      providesTags: ["rental", "payment"],
      query: () => ({
        url: "/get-payment",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreatePaymentMutation, useGetPaymentByUserQuery } =
  paymentApi;
