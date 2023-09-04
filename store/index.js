import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/base";
import { authSlice } from "./slices/authSlice";
import { uiSlice } from "./slices/uiSlice";

export const createStore = (options) =>
	configureStore({
		reducer: {
			[baseApi.reducerPath]: baseApi.reducer,
			[authSlice.name]: authSlice.reducer,
			[uiSlice.name]: uiSlice.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(baseApi.middleware),
		...options,
	});

export const store = createStore();
