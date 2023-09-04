import { baseApi } from "./base";

export const chatHistoryApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getChatHistory: build.query({
			query: ({ page }) => `/user/openai/chat/history/4?page=${page}`,
		}),
	}),
	overrideExisting: false,
});

export const { useGetChatHistoryQuery } = chatHistoryApi;
