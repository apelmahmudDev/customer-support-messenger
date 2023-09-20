import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzYzOWM5NDUwNzRlN2I3Yzc5MTUzNmE4ODA2OTczYzFiMDI4MjJhYWQzOTYyY2EzN2QwMTNkZDVlMDAzMmQ0ZWU1ZWNiYjE3M2FhYjY3ZjgiLCJpYXQiOjE2OTUxODA4MzkuMDI5Njc5LCJuYmYiOjE2OTUxODA4MzkuMDI5NjgyLCJleHAiOjE3MjY4MDMyMzkuMDI2MTk2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.gMPsI8gCoUch_It5pE5rAx8LfstQ-vBRlt0ggvVMGQAzW9d3n7-yYTpFiHXaoqMIeaMUZ-BlOf0PCU976rT5SZpu2-s-Nd3_9sI41jpqJ0h-OBE2x6QRZbUrCzLClJaugdXX71eZLcByxOJYVdVWc9gVmrcoPNtRFdAS4B6AsYNE_Q65-ZRZ9bWpIDHOSOy6RwmjStJ7e57UHhB2jY1EblFCO6AL3PeREMnSODzuFnvpuDGQnAthRpd_3pB7NpHi7enfn44QD27dOwlix0ci7pshFMpLi_BxDn0j7Z1VfOgNXhwsEs5sbofrZCpqRjnYyigPUi7InX6rK59XGmPRnh9Gru9RIbqpfacvJA2pxeFbzMBs02PaSQ_a81NrfatRVjODwBXKVh_xEkYHEBMhEurYuL96Sza0G2qh4p8EItlw6F6tmgXZbfyPA0w8I0X3Xyb5iEXeatp7QvzCiSS4_Eu2GpmE-62H5WXY2CQgmruDuiR949PaFD0nhEPTUSOQQQyjsZdFc5Et6VOJmA-6JpK2z6Rv6cqNk6hxRYOnGZsZopNOjPCNl04kJe7sCTb57IRjWdulmvzKO_5291CrdtnappT45S0Hu6EdzkfNvUCfNxJPk1CAyryQDNjVyamcd65C2MPETcX28MkfffnPI9fVyD5YB1YfS9Rv8dKInZQ",
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
