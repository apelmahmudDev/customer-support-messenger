import { baseApi } from "./base";

export const chatDeleteApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteChat: build.mutation({
			query: (chatId) => ({
				url: `/user/openai/chat/delete`,
				method: "POST",
				body: chatId,
			}),
			onCacheEntryAdded({ chatId }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					baseApi.util.updateQueryData(
						"getChatConversation",
						undefined,
						(draft) => {
							return draft;
						}
					)
				);
				console.log("draft", patchResult);
				// try {
				// 	await queryFulfilled;
				// } catch (error) {
				// 	await patchResult.undo();
				// }
			},
		}),
	}),
	overrideExisting: false,
});

export const { useDeleteChatMutation } = chatDeleteApi;
