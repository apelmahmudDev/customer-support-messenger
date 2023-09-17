import { baseApi } from "./base";

export const chatDeleteApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		deleteChat: build.mutation({
			query: (chatId) => ({
				url: `/user/openai/chat/delete`,
				method: "POST",
				body: chatId,
			}),
			invalidatesTags: ["Chat"],
			onQueryStarted({ chatId }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					baseApi.util.updateQueryData(
						"getChatConversation",
						undefined,
						(draft) => {
							return draft;
						}
					)
				);

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
