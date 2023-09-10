import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	openSidebar: false,
	isBoatTyping: false,
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setOpenSidebar: (state) => {
			state.openSidebar = !state.openSidebar;
		},
		setBoatTyping: (state, action) => {
			state.isBoatTyping = action.payload;
		},
	},
});

export const { setOpenSidebar, setBoatTyping } = uiSlice.actions;
export default uiSlice.reducer;
