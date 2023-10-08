import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UrlApi = createApi({
  reducerPath: "UrlApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/v1/",
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: ({ articleUrl, type }) =>
        `data?url=${encodeURIComponent(articleUrl)}&type=${type}`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = UrlApi;
