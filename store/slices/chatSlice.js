import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	conversationId: null,
};

export const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		storeConversationId: (state, action) => {
			state.conversationId = action.payload;
		},
	},
});

export const { storeConversationId } = chatSlice.actions;
export default chatSlice.reducer;
