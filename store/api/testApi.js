import { apiSlice } from "./apiSlice";
import { setBotTyping } from "../slices/uiSlice";
import { storeTempMessage } from "../slices/chatSlice";

export const testApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChatMessage: builder.query({
			query: (conversationId) =>
				`/user/openai/chat/history/${conversationId}?page=1`,
			transformResponse: (response) => {
				return {
					data: response?.response?.records?.data,
					pagination: response?.response?.records?.pagination,
				};
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(storeTempMessage(null));
					dispatch(setBotTyping(false));
				} catch (error) {
					dispatch(setBotTyping(false));
					// do nothing
				}
			},
			providesTags: ["Chat"],
		}),

		getChatMoreMessage: builder.query({
			query: ({ page, conversationId }) =>
				`/user/openai/chat/history/${conversationId}?page=${page}`,
			transformResponse: (response) => response?.response?.records?.data,

			async onQueryStarted(
				{ conversationId },
				{ dispatch, queryFulfilled }
			) {
				try {
					const result = await queryFulfilled;
					dispatch(
						apiSlice.util.updateQueryData(
							"getChatMessage",
							conversationId,
							(draft) => {
								// console.log("draft", JSON.stringify(draft));
								draft.data.push(...result?.data);
							}
						)
					);
				} catch (error) {}
			},
		}),

		getConversation: builder.query({
			query: () => `/user/openai/chat/conversation?page=1`,
			transformResponse: (response) => {
				return {
					data: response?.response?.records?.data,
					pagination: response?.response?.records?.pagination,
				};
			},
			providesTags: ["Chat"],
		}),

		getMoreConversation: builder.query({
			query: (page) => `/user/openai/chat/conversation?page=${page}`,
			transformResponse: (response) => response?.response?.records?.data,

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(
						apiSlice.util.updateQueryData(
							"getConversation",
							undefined,
							(draft) => {
								// console.log("draft", JSON.stringify(draft));
								draft.data.push(...result?.data);
							}
						)
					);
				} catch (error) {}
			},
		}),

		storeChat: builder.mutation({
			query(body) {
				return {
					url: `/user/openai/chat`,
					method: "POST",
					body: { promt: body.promt, chatId: body.conversationId },
				};
			},
			async onQueryStarted({ conversationId, promt },{ dispatch, queryFulfilled }) {
				// optimistic update start
				const patch = {
					user_message: promt,
					id: Date.now().toString(),
					isTemp: true,
				};
				const patchResult = dispatch(
					apiSlice.util.updateQueryData("getChatMessage", conversationId, (draft) => {
							draft.data.push(patch);
						}
					)
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();	
				}
				// optimistic update end
			},
			invalidatesTags: ["Chat"],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetChatMessageQuery,
	useGetChatMoreMessageQuery,
	useGetConversationQuery,
	useStoreChatMutation,
} = testApi;
