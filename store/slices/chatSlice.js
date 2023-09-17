import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	conversationId: null,
	messages: [],
};

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		storeMessages: (state, action) => {
			// store unique messages only
			const uniqueMessages = action.payload.filter(
				(message) =>
					!state.messages.some((stateMessage) => stateMessage.id === message.id)
			);
			state.messages = [...state.messages, ...uniqueMessages];
		},
		resetMessages: (state) => {
			state.messages = [];
		},
		storeConversationId: (state, action) => {
			state.conversationId = action.payload;
		},
	},
});

export const { storeMessages, resetMessages, storeConversationId } =
	chatSlice.actions;
export default chatSlice.reducer;
