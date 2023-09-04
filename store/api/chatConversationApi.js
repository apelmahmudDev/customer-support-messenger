import { baseApi } from "./base";

export const chatConversationApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getChatConversation: build.query({
			query: ({ page }) => `/user/openai/chat/conversation?page=${page}`,
			transformResponse: (response) => response?.response?.records,
		}),
	}),
	overrideExisting: false,
});

export const { useGetChatConversationQuery } = chatConversationApi;
