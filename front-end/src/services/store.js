import { configureStore } from "@reduxjs/toolkit";

import { UrlApi } from "./url";
import { PdfApi } from "./pdf";
import { PptxApi } from "./pptx";
import { WordApi } from "./word";

export const store = configureStore({
  reducer: {
    [UrlApi.reducerPath]: UrlApi.reducer,
    [PdfApi.reducerPath]: PdfApi.reducer,
    [WordApi.reducerPath]: WordApi.reducer,
    [PptxApi.reducerPath]: PptxApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      UrlApi.middleware,
      PdfApi.middleware,
      WordApi.middleware,
      PptxApi.middleware
    ),
});
