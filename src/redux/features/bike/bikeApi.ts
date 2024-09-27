import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBike: builder.mutation({
      invalidatesTags: ["bike"],
      query: (bikeInfo) => ({
        url: "/bikes",
        method: "POST",
        body: bikeInfo,
      }),
    }),
    getBikes: builder.query({
      providesTags: ["bike"],
      query: () => ({
        url: "/bikes",
        method: "GET",
      }),
    }),
    getSingleBike: builder.query({
      providesTags: ["bike", "rental"],
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
      query: ({ formData, bikeId }) => ({
        url: `/bikes/${bikeId}`,
        method: "PUT",
        body: formData,
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
