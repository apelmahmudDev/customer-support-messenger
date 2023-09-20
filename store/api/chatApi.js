import { apiSlice } from "./apiSlice";

export const chatApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addChat: builder.mutation({
			query(body) {
				return {
					url: `/user/openai/chat`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["Chat"],
		}),
		updateChat: builder.mutation({
			query(data) {
				const { id, ...body } = data;
				return {
					url: `/user/openai/chat/update`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: (chat) => [{ type: "Chat", id: chat?.id }],
		}),
		deleteChat: builder.mutation({
			query(chatId) {
				return {
					url: `/user/openai/chat/delete`,
					method: "POST",
					body: chatId,
				};
			},
			invalidatesTags: (chat) => [{ type: "Chat", id: chat?.id }],
		}),
	}),
	overrideExisting: true,
});

export const {
	useAddChatMutation,
	useUpdateChatMutation,
	useDeleteChatMutation,
} = chatApi;
