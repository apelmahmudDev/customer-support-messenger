import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/base";
import { authSlice } from "./slices/authSlice";
import { uiSlice } from "./slices/uiSlice";
import { chatSlice } from "./slices/chatSlice";

export const createStore = (options) =>
	configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer,
			[authSlice.name]: authSlice.reducer,
			[uiSlice.name]: uiSlice.reducer,
			[chatSlice.name]: chatSlice.reducer,
		},
		devTools: process.env.NODE_ENV !== "production",
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(baseApi.middleware),
		...options,
	});

export const store = createStore();
