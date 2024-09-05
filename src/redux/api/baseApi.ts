import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl:
    "https://bike-rental-api-with-typescript-mongoose-express.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log("sending refresh token");
    const res = await fetch(
      `https://bike-rental-api-with-typescript-mongoose-express.vercel.app/api/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const refreshResult = await res.json();
    if (refreshResult.data) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: refreshResult.data.token,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
