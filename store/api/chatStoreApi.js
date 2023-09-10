import { baseApi } from "./base";

export const chatStoreApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		storeChat: build.mutation({
			query: (body) => ({
				url: `/user/openai/chat`,
				method: "POST",
				body,
			}),
			transformResponse: (response) => response?.response?.records,
			invalidatesTags: ["Chat"],
		}),
	}),
	overrideExisting: false,
});

export const { useStoreChatMutation } = chatStoreApi;
