import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),

    updateMyProfile: builder.mutation({
      invalidatesTags: ["user"],
      query: (updateData) => ({
        url: "/users/me",
        method: "PUT",
        body: updateData,
      }),
    }),

    getAllUsers: builder.query({
      providesTags: ["user"],
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      invalidatesTags: ["user"],
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUserRole: builder.mutation({
      invalidatesTags: ["user"],
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = authApi;
