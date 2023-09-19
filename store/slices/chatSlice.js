import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	conversationId: null,
	tempMessageId: null,
	messages: [],
	conversation: [],
};

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		storeMessages: (state, action) => {
			// store unique messages only
			const uniqueMessages = action.payload.filter(
				(message) =>
					!state.messages.some(
						(stateMessage) => stateMessage.id === message.id
					)
			);
			state.messages = [...state.messages, ...uniqueMessages];
		},
		storeTempMessage: (state, action) => {
			// store temp message at last index
			state.messages = [...state.messages, action.payload];
			state.tempMessageId = action.payload.id;
		},
		removeLastTempMessage: (state) => {
			// remove last temp message
			state.messages = state.messages.filter(
				(message) => message.id !== state.tempMessageId
			);
			state.tempMessageId = null;
		},
		resetMessages: (state) => {
			state.messages = [];
		},
		storeConversationId: (state, action) => {
			state.conversationId = action.payload;
		},
		// conversation
		storeConversation: (state, action) => {
			state.conversation = [...state.conversation, ...action.payload];
		},
	},
});

export const {
	storeMessages,
	storeTempMessage,
	resetMessages,
	storeConversationId,
	removeLastTempMessage,
	storeConversation,
} = chatSlice.actions;
export default chatSlice.reducer;
