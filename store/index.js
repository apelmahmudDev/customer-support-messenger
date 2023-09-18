import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { uiSlice } from "./slices/uiSlice";
import { chatSlice } from "./slices/chatSlice";
import { apiSlice } from "./api/apiSlice";

export const createStore = (options) =>
	configureStore({
		reducer: {
			[apiSlice.reducerPath]: apiSlice.reducer,
			[authSlice.name]: authSlice.reducer,
			[uiSlice.name]: uiSlice.reducer,
			[chatSlice.name]: chatSlice.reducer,
		},
		devTools: process.env.NODE_ENV !== "production",
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(apiSlice.middleware),
		...options,
	});

export const store = createStore();
