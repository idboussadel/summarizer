import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PptxApi = createApi({
  reducerPath: "PptxApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/api/v1/",
  }),
  endpoints: (builder) => ({
    postPresentation: builder.mutation({
      query: (data) => ({
        url: "pptx",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostPresentationMutation: usePostPptxMutation } = PptxApi;
