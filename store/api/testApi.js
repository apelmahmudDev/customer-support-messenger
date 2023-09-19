import { apiSlice } from "./apiSlice";

export const chatApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPost: builder.query({
			query: () =>
				`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10`,
			// providesTags: (_result, _err, id) => [{ type: "Chat", id }],
		}),
		getMorePost: builder.query({
			query: ({ page, limit }) =>
				`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(
						apiSlice.util.updateQueryData(
							"getPost",
							undefined,
							(draft) => {
								console.log("draft", JSON.stringify(draft));
								// console.log("result", result?.data);

								draft.push(...result?.data);
							}
						)
					);
				} catch (error) {}
			},
		}),
	}),
	overrideExisting: true,
});

export const { useGetPostQuery, useGetMorePostQuery } = chatApi;
