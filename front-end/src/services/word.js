import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const WordApi = createApi({
  reducerPath: "WordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/v1/",
  }),
  endpoints: (builder) => ({
    postDocument: builder.mutation({
      query: (data) => ({
        url: "word",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostDocumentMutation: usePostWordMutation } = WordApi;
