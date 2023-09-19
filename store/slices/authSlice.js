import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmFjZWViMDczOTRmY2IyOWJhNmI4ZGE4NjFmMDQ2YzFhZmExYTFhMWM0YmY1NzY0Y2Y5MzljYzQ4NDVkZGYwMWIwYzQ3MTUzYTJiNmY5MDEiLCJpYXQiOjE2OTUxMDMwNTUuNDk1ODc4LCJuYmYiOjE2OTUxMDMwNTUuNDk1ODgsImV4cCI6MTcyNjcyNTQ1NS40OTIwNSwic3ViIjoiMSIsInNjb3BlcyI6W119.dNZe5yyiGVezJI33ehQyGn098HwBMGyE_Yo_mmKkNm46NWDvUU3k3sR2IU0xI1eSSJ-F6AW-pppfN0pU3z0W7nhjVsPxp2GZ1CUBQVmYM7_S2UMYbVuDK0FHsvyT7UJvn9H1dtqrTwmB2d-t-tBlXED5BfcUywIl7mLMx3ZSA8TFDjDRz1BwKVA9lFRspnwF35-8wrEJjfzVCcCHr5pFL3y0qGnXrtHTWDqn4U5wz_cT8qRzgG3QtqBhBt6om2ZePBlYd4oDKEAKO5ZTNhMPmK62QgyiCEGihLguXBEAWcuc53sLoycUYQiupV79hBjacKn_KziN5mp4uCCrYWG1vBvu4Fw5rqVuQ68jdq6EdPKoMWZvZ7dtJmXHfsDmNJYFr3LBk84FI1WNXbNmVncubAnNbFzjmGEB2l2E9TYg8GsfdeemgPcG6VBXeihLWAO8Kocjk2inc_uGSQ-ZmbKBvKRrO9emjVkgraupbPgPsbRYDkptrihWyO0Sf3pH62HQvzo0ez1gSig9HeRckqxws-innyx6MwEmJMxHxwIiC2FwS-XNWSuQXK9dd9uD3x6S1jDC86Tnl6XxuPHTFkh58mwUwKN0GCNxu--6Hy5A9eMwt9fC-iJQDEq1S7WoznVPbKAx37oOs_d_TOPm3JSD9GJ0W1CsaJ_MNr9r5F9JjE4",
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
