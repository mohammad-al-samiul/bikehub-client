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
    deleteBike: builder.mutation({
      invalidatesTags: ["bike"],
      query: (bikeId) => ({
        url: `/bikes/${bikeId}`,
        method: "DELETE",
      }),
    }),
    updateBike: builder.mutation({
      invalidatesTags: ["bike"],
      query: ({ bikeData, bikeId }) => ({
        url: `/bikes/${bikeId}`,
        method: "PUT",
        body: bikeData,
      }),
    }),
  }),
});

export const {
  useGetBikesQuery,
  useGetSingleBikeQuery,
  useDeleteBikeMutation,
  useUpdateBikeMutation,
} = bikeApi;
