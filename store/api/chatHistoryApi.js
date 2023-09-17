import { storeMessages } from "../slices/chatSlice";
import { baseApi } from "./base";

export const chatHistoryApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getChatHistory: build.query({
			query: ({ conversationId }) =>
				`/user/openai/chat/history/${conversationId}`,
			providesTags: ["Chat"],
		}),

		getMoreChatHistory: build.query({
			query: ({ conversationId, page }) =>
				`/user/openai/chat/history/${conversationId}?page=${page}`,

			async onQueryStarted({ conversationId }, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					const chat = result?.data?.response?.records?.data;

					if (chat?.length > 0) {
						dispatch(storeMessages(chat));

						// update conversation cache pessimistically start

						// dispatch(
						// 	baseApi.util.updateQueryData(
						// 		"getChatHistory",
						// 		email,
						// 		(draft) => {
						// 			return {
						// 				data: [...draft.data, ...conversations.data],
						// 				totalCount: Number(draft.totalCount),
						// 			};
						// 		}
						// 	)
						// );

						// update messages cache pessimistically end
					}
				} catch (err) {}
			},

			providesTags: ["Chat"],
		}),
	}),
	overrideExisting: false,
});

export const { useGetChatHistoryQuery, useGetMoreChatHistoryQuery } =
	chatHistoryApi;
