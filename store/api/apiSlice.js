import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
		prepareHeaders: async (headers, { getState, endpoint }) => {
			const token = getState()?.auth?.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),

	refetchOnReconnect: true,
	tagTypes: ["Chat"],
	endpoints: (builder) => ({}),
});
