import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	openSidebar: false,
	isBotTyping: false,
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setOpenSidebar: (state) => {
			state.openSidebar = !state.openSidebar;
		},
		setBotTyping: (state, action) => {
			state.isBotTyping = action.payload;
		},
	},
});

export const { setOpenSidebar, setBotTyping } = uiSlice.actions;
export default uiSlice.reducer;
