import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBikes: builder.query({
      query: () => ({
        url: "/bikes",
        method: "GET",
      }),
    }),
    getSingleBike: builder.query({
      query: (id) => ({
        url: `bikes/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBikesQuery, useGetSingleBikeQuery } = bikeApi;
