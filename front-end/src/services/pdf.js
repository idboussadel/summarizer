import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PdfApi = createApi({
  reducerPath: "PdfApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/v1/",
  }),
  endpoints: (builder) => ({
    postSummary: builder.mutation({
      query: (data) => ({
        url: `pdf`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostSummaryMutation } = PdfApi;
