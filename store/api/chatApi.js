import { removeLastTempMessage, storeMessages } from "../slices/chatSlice";
import { setBotTyping } from "../slices/uiSlice";
import { apiSlice } from "./apiSlice";

export const chatApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChatConversation: builder.query({
			query: () => `/user/openai/chat/conversation?page=1`,
			// providesTags: (_result, _err, id) => [{ type: "Chat", id }],
			providesTags: ["Chat"],
		}),
		getMoreChatConversation: builder.query({
			query: (page) => `/user/openai/chat/conversation?page=${page}`,
			providesTags: ["Chat"],
		}),

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
	useGetChatConversationQuery,
	useGetMoreChatConversationQuery,
	useGetChatHistoryQuery,
	useGetMoreChatHistoryQuery,
	useAddChatMutation,
	useUpdateChatMutation,
	useDeleteChatMutation,
} = chatApi;
