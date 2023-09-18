import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWIzMDA1ZGQ5YjM5YzJlYjU5ZjMzZDc3OGZmMjcxNTExYTJlODk3ZjYxNDU3OTU0YjM1ZDNjMTZhMGQzOTgyYzMxN2JiNWE0MzE0NGI2MDciLCJpYXQiOjE2OTUwMjQ2ODMuMjcxMjMxLCJuYmYiOjE2OTUwMjQ2ODMuMjcxMjMzLCJleHAiOjE3MjY2NDcwODMuMjY3MjI2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.kpOV7HhsrLTXRHC7GyhmkY0DwLwUlASlz1gjTckdp1ZGj-4KSgZEVcQxbZVuylQSHkgDwvAZvlYaA6qI4OWlDPzVSpDGMdN-0a3QwIAv1jDoXXJo0uDW1bEw4wirkh-zFQbYtD2KEbIYN34oeffiguyYwxh_J0wTe7z-nQuiNMVicC5snHEjVDabd0tXegaiMtDsz9Fc69UGdQmQH3LrxqpO3G-Rfhxb4ZaAp0ygOR0mIbra4YNnmaBDDdOsrB3rFlDQ78ByCLWx_BCq5ngE-1Ly0KxiKigHOb0kyRwMLI4gn7rzLrLnyXZVrr-sUlbzvKaFHyziAXz34LDoP8JeIQBt1zcgK8P89tIaCGKJysCQJR8OT_wFDAMqdYRBsTvenCDAOIolm3XqO7OgEx6VpxQxRiB0eAqJ2jlknGvg_-oW-H4Kbw8zsAvKn0CZ54Po2gf0Um2tPTvaAzz5dORHPijZf2KVXDbfcQR5x5uGia0G2mMu0ASRd_dOovTH_ct9n19l50Rj-It6DQddI4vBdint3l2_MFYr7sWKT1AiGX9OKzRFCphxOMDmlDp6mAqJEzfUFgXKrFMoAlEXnYo11kDcB1nGX-eIHQNwl-h--7KvW_7zf063b6rFrMrA11__v46lI3zBJAljqqJ-2XOmJkzU0tQBGqnr2o1FRZGawf4",
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
