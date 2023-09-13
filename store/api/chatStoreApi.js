import { setBotTyping } from "../slices/uiSlice";
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
			async onQueryStarted(
				{ promt, chatId },
				{ dispatch, queryFulfilled }
			) {
				dispatch(setBotTyping(true));
				try {
					const result = await queryFulfilled;
					dispatch(setBotTyping(false));
				} catch (error) {
					dispatch(setBotTyping(false));
				}
			},
			invalidatesTags: ["Chat"],
		}),
	}),
	overrideExisting: false,
});

export const { useStoreChatMutation } = chatStoreApi;
