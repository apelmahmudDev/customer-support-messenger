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

			async onQueryStarted({ body }, { queryFulfilled, dispatch }) {
				try {
					const conversations = await queryFulfilled;

					if (conversations?.data) {
						// update conversation cache pessimistically start
						// const patchResult = dispatch(
						// 	baseApi.util.updateQueryData(
						// 		"getChatConversation",
						// 		undefined,
						// 		(draft) => {
						// 			draft.data = [...draft.data, ...conversations.data];
						// 			return draft;
						// 		}
						// 	)
						// );
						// update messages cache pessimistically end
					}
				} catch (err) {}
			},
			invalidatesTags: ["Chat"],
		}),
	}),
	overrideExisting: false,
});

export const { useStoreChatMutation } = chatStoreApi;
