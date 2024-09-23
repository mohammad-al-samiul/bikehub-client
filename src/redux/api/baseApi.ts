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
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    // If we have a token set in state, let's assume that we should be passing it.
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
  console.log("basequery", result);

  if (result.error && result.error.status === 401) {
    const res = await fetch(`http://localhost:5000/api/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const refreshResult = await res.json();
    console.log("refresh result", refreshResult);

    if (refreshResult.data) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user: user,
          token: refreshResult.data.accessToken,
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
  tagTypes: ["user", "bike", "rental"],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
