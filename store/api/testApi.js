import { setBotTyping } from "../slices/uiSlice";
import { apiSlice } from "./apiSlice";

export const testApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChatMessage: builder.query({
			query: (conversationId) =>
				`/user/openai/chat/history/${conversationId}?page=1`,
			transformResponse: (response) => {
				return {
					data: response?.response?.records?.data,
					pagination: response?.response?.records?.pagination,
				};
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(setBotTyping(false));
				} catch (error) {
					dispatch(setBotTyping(false));
					// do nothing
				}
			},
			providesTags: ["Chat"],
		}),
		getChatMoreMessage: builder.query({
			query: ({ page, conversationId }) =>
				`/user/openai/chat/history/${conversationId}?page=${page}`,
			transformResponse: (response) => response?.response?.records?.data,

			async onQueryStarted(
				{ conversationId },
				{ dispatch, queryFulfilled }
			) {
				try {
					const result = await queryFulfilled;
					dispatch(
						apiSlice.util.updateQueryData(
							"getChatMessage",
							conversationId,
							(draft) => {
								console.log("draft", JSON.stringify(draft));
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
