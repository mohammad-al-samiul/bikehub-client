import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBikes: builder.query({
      query: () => ({
        url: "/bikes",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetBikesQuery } = bikeApi;
