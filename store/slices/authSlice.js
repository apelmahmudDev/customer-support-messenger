import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZmIzNWEwZmQxYWIyNGY1OGQxZGMwNmEzNzAwYTQ3MThkMjMzOThhY2UzYmEwNDk1ZjM1ZGQzZDliMjEzZWE1OGE5NDlmMTUxZjFjM2I2MTAiLCJpYXQiOjE2OTUwMTcxNzcuODM4OTgxLCJuYmYiOjE2OTUwMTcxNzcuODM4OTg0LCJleHAiOjE3MjY2Mzk1NzcuODM0MjIzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.uYpQZjFYYzn6huEea2PqFxrtzKJLwv8dolV6Bpb7Gk3ZAhbuH-KY98hXWglFSrRcT1YdcdjBcdHmZVPyue8zxIbCol9EesxmXphGTomOd9jZbfvI4ZYEQSp7UhHcSfdoz-E1Q_SZvJ-CA4egrzF-jUSJNmP86NjRlkPGGZWU28iU_mrQIUZvLyxxGQcPtyRUZT2QD3kp3RnrkCuIJg_R7bcCcV3qV_2e8QumT_Xd4gb0eZl7oCL4iPyMla2lJqz0rHLIM55bS5bWJX11VNzNxxWhH94_W58q-9L62CRt3yGXtnm5SaadX0lMya9j2TpR2QWfDg6B8z0LFQsNQnpSt6o-tQV_rsT_YyZrGQCHZ0H1GJ837Vpu4G6WgkSGJCZJlmrUL1-4-RBfpKzcNmyFH2EjOSCsQse7HrA7UC9eRb_RHXK-TV0_tqqqht2qlJBU4s6kQ_JSDW4_G4rdtb7qf9jBvkFqK7xt5R09KD0iWK-lvBIowB7wuVhfu7b76ZfjPcZKdLNHpI30ab81KrArVsXur4SWZQFpktPSvUnrZOvPnhkRfWe8ZbfW5mc6d6Bs4-Vsz7GIx7_E87CdZh7jelEh4ujeLqutrG261dNYVrwdGpribtLyKFzi2RexlsHyChxeZvdg6IHLxuJC-h2FCy9H_c1nXk75VzJbWBlhPno",
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
