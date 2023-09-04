import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	openSidebar: false,
};

export const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setOpenSidebar: (state) => {
			state.openSidebar = !state.openSidebar;
		},
	},
});

export const { setOpenSidebar } = uiSlice.actions;
export default uiSlice.reducer;
