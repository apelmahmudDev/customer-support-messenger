import { baseApi } from "./base";

export const chatHistoryApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getChatHistory: build.query({
			query: ({ conversationId, page }) =>
				`/user/openai/chat/history/${conversationId}?page=${page}`,
			transformResponse: (response) => {
				const { data, pagination } = response?.response?.records;
				return { data: data, pagination };
			},
			providesTags: ["Chat"],
		}),
	}),
	overrideExisting: false,
});

export const { useGetChatHistoryQuery } = chatHistoryApi;
