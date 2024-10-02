import { baseApi } from "../../api/baseApi";

const rentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    rentBike: builder.mutation({
      invalidatesTags: ["rental", "bike"],
      query: (rentInfo) => ({
        url: "/rentals",
        method: "POST",
        body: rentInfo,
      }),
    }),

    returnBike: builder.mutation({
      invalidatesTags: ["rental"],
      query: ({ rentalEndTime, rentalId }) => ({
        url: `/rentals/${rentalId}/return`,
        method: "PUT",
        body: rentalEndTime,
      }),
    }),

    getRentAllBike: builder.query({
      providesTags: ["rental", "payment", "user"],
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
