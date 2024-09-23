import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBike: builder.mutation({
      invalidatesTags: ["bike"],
      query: (data) => ({
        url: "/bikes",
        method: "POST",
        body: data,
      }),
    }),
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
      query: (bikeId) => ({
        url: `/bikes/${bikeId}`,
        method: "DELETE",
      }),
    }),
    updateBike: builder.mutation({
      query: ({ bikeData, bikeId }) => ({
        url: `/bikes/${bikeId}`,
        method: "PUT",
        body: bikeData,
      }),
    }),
  }),
});

export const {
  useCreateBikeMutation,
  useGetBikesQuery,
  useGetSingleBikeQuery,
  useDeleteBikeMutation,
  useUpdateBikeMutation,
} = bikeApi;
