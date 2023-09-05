import { baseApi } from "./base";

export const chatHistoryApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getChatHistory: build.query({
			query: ({ page }) => `/user/openai/chat/history/4?page=${page}`,
			transformResponse: (response) => response?.response?.records,
		}),
	}),
	overrideExisting: false,
});

export const { useGetChatHistoryQuery } = chatHistoryApi;
