import { setBoatTyping } from "../slices/uiSlice";
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
				dispatch(setBoatTyping(true));
				try {
					const result = await queryFulfilled;
					dispatch(setBoatTyping(false));
				} catch (error) {
					dispatch(setBoatTyping(false));
				}
			},
			invalidatesTags: ["Chat"],
		}),
	}),
	overrideExisting: false,
});

export const { useStoreChatMutation } = chatStoreApi;
