import { baseApi } from "./base";

export const chatUpdateApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		updateChat: build.mutation({
			query: (body) => ({
				url: `/user/openai/chat/update`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Chat"],
		}),
	}),
	overrideExisting: false,
});

export const { useUpdateChatMutation } = chatUpdateApi;
