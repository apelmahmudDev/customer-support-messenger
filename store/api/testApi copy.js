import { apiSlice } from "./apiSlice";

export const testApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChatMessage: builder.query({
			query: () => `/user/openai/chat/history/1?page=1`,
			transformResponse: (response) => {
				return {
					data: response?.response?.records?.data,
					pagination: response?.response?.records?.pagination,
				};
			},
			// providesTags: (_result, _err, id) => [{ type: "Chat", id }],
		}),
		getChatMoreMessage: builder.query({
			query: ({ page }) => `/user/openai/chat/history/1?page=${page}`,
			transformResponse: (response) => response?.response?.records?.data,

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(
						apiSlice.util.updateQueryData(
							"getChatMessage",
							undefined,
							(draft) => {
								// console.log("draft", JSON.stringify(draft));
								draft.data.push(...result?.data);
							}
						)
					);
				} catch (error) {}
			},
		}),
	}),
	overrideExisting: true,
});

export const { useGetChatMessageQuery, useGetChatMoreMessageQuery } = testApi;
