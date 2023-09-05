import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// baseQuery instance
const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const baseApi = createApi({
	reducerPath: "splitApi",
	baseQuery: baseQuery,
	tagTypes: ["Chat"],
	endpoints: () => ({}),
});
