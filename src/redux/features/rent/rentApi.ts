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

    returnBike: builder.mutation({
      invalidatesTags: ["rental"],
      query: ({ rentalId }) => ({
        url: `/rentals/${rentalId}/return`,
        method: "PUT",
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

export const {
  useRentBikeMutation,
  useReturnBikeMutation,
  useGetRentAllBikeQuery,
} = rentApi;
