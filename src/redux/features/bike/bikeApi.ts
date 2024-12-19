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
    getBikesWithPagination: builder.query({
      providesTags: ["bike"],
      query: ({
        search,
        category,
        page = 1, // default to 1 if page is not provided
        limit = 8, // default to 8 if limit is not provided
      }: {
        search?: string;
        category?: string;
        page?: number;
        limit?: number;
      }) => ({
        url: "/bikes/bike-listing",
        method: "GET",
        params: {
          search,
          category,
          page: page.toString(), // Convert to string
          limit: limit.toString(), // Convert to string
        },
      }),
    }),
    getBikes: builder.query({
      providesTags: ["bike"],
      query: () => ({
        url: `/bikes`,
        method: "GET",
      }),
    }),
    getSingleBike: builder.query({
      providesTags: ["bike", "rental"],
      query: (id) => ({
        url: `/bikes/${id}`,
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
  useGetBikesWithPaginationQuery,
} = bikeApi;
