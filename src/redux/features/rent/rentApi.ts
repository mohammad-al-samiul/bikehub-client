import { baseApi } from "../../api/baseApi";

const rentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    rentBike: builder.mutation({
      query: (rentInfo) => ({
        url: "/rentals",
        method: "POST",
        body: rentInfo,
      }),
    }),
    getRentAllBike: builder.query({
      query: () => ({
        url: `/rentals`,
        method: "GET",
      }),
    }),
  }),
});

export const { useRentBikeMutation, useGetRentAllBikeQuery } = rentApi;
