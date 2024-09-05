import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://bike-rental-api-with-typescript-mongoose-express.vercel.app/api",
  }),
  endpoints: () => ({}),
});
