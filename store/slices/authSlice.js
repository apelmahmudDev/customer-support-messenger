import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGFjYmI5ZTE4ZTg1YjdiNmI2NzkwYzBkMWE3ZTI1YTljM2RkMzcyOGEzYzg3ZjY5YjJlMTIyYzk0NzhkYWM0NDJkYTNmMGI3NmZlMDcwZDkiLCJpYXQiOjE2OTUwOTg0OTguODY0ODUzLCJuYmYiOjE2OTUwOTg0OTguODY0ODU2LCJleHAiOjE3MjY3MjA4OTguODYwNiwic3ViIjoiMSIsInNjb3BlcyI6W119.ANlaNTDcyTjJ_qoaF-TcDuD90hzLVieGfDbhC9F30Koxbr-sRapAvbRzUjIP_zMuFy8Mc9hxb_GFgbgSAfLFIHpS4gU1HdAO2egiY3NLn2U_OB-V-M8Woqf1NlvR_gCX8iOfsPZaPStJX54ruZzTqD4MRwslAsZaBpIPN6yM6B3Z83h8GYt2NpmWQr9HQ-UTLEG94T6-pJ2QbYuoPNVNEgvAe85Gx4DQEuQZ0d7yxYG1La2nrX7v9bsXfmJO1q7VB6BHCYtGIPsIENOMhJPtF0JPVdRyGceaw3OB9cvF0Zdpnk1Mo4Gs2vu5LUJZLu8lFa95o-yBeNfzmVBIfHjZZtwZN8-S9BaCJQH4j43aCSbSoXVf440XasTE9fLh5KzHZIWRtNlbr8UMi82njIt0qgoJS7aGmt6r_K_LzdyAUHV9F2cS3vqwjCZGyXk5R1BYLpyYxvFpsKedjNI67ikDGVLAlpsRgIe3Wz_h3VX3WjO3Ju7A_nODMRFVbHTte47EVC1N1d_CC9PaTPzwWmkZhmJcMiWL2LoWVzfcCS5V19ibQAhh073XceJdxjESbRAfAmpvlN_SU_TCueJAXMHURAzQRVybbYwQP4okCBuWW5pC_Y2JLYbfzp6zm5-jyuBbEvTaguZGyi5-7X2Q81wI0923Be9eZB8Z_RC-9js5mcs",
	user: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoggedIn: (state, action) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		userLoggedOut: (state) => {
			state.token = undefined;
			state.user = undefined;
		},
	},
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
