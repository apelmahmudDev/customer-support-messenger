import { baseApi } from "./base";

export const chatHistoryApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getChatHistory: build.query({
			query: ({ conversationId, page }) =>
				`/user/openai/chat/history/${conversationId}?page=${page}`,
			transformResponse: (response) => response?.response?.records,
		}),
	}),
	overrideExisting: false,
});

export const { useGetChatHistoryQuery } = chatHistoryApi;
