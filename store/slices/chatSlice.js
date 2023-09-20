import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	conversationId: null,
	initialMessage: null,
};

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		storeTempMessage: (state, action) => {
			state.initialMessage = action.payload;
		},
		storeConversationId: (state, action) => {
			state.conversationId = action.payload;
		},
	},
});

export const { storeTempMessage, storeConversationId } = chatSlice.actions;
export default chatSlice.reducer;
