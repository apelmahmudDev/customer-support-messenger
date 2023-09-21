import { apiSlice } from "./apiSlice";
import { setBotTyping } from "../slices/uiSlice";

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
			//start  optimistic
			async onQueryStarted(
				{ conversationId, promt },
				{ dispatch, queryFulfilled }
			) {
				const patch = {
					id: Date.now(),
					title: promt,
				};

				// console.log("id", conversationId);
				// conversation optimistic update start

				const patchResult = dispatch(
					apiSlice.util.updateQueryData(
						"getConversation",
						undefined,
						(draft) => {
							console.log("message", JSON.stringify(draft?.data));
							draft.data.push(patch);
						}
					)
				);

				// conversation optimistic update start

				// history optimistic update start

				// const patch = {
				// 	user_message: promt,
				// 	id: Date.now().toString(),
				// 	isTemp: true,
				// };

				// const patchResult = dispatch(
				// 	apiSlice.util.updateQueryData(
				// 		"getChatMessage",
				// 		conversationId,
				// 		(draft) => {
				// 			console.log("history", JSON.stringify(draft));
				// 			draft.data.push(patch);
				// 		}
				// 	)
				// );

				// history optimistic update end

				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
					/**
					 * Alternatively, on failure you can invalidate the corresponding cache tags
					 * to trigger a re-fetch:
					 * dispatch(api.util.invalidateTags(['Post']))
					 */
				}
			},
			//start  optimistic
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
