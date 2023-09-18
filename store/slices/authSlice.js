import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token:
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGZhYmViN2MzYzA5ZGEwOWVlNjBlYTM5YmRiZTU3MzVhODFmYmQ3NzNhMTgwOWU3MWEzNGI4OWE5NDA5N2I0ODdjOWZlYTZmZjdmNzU3MTUiLCJpYXQiOjE2OTQ5NjQzMTcuMTcxNTE0LCJuYmYiOjE2OTQ5NjQzMTcuMTcxNTE3LCJleHAiOjE3MjY1ODY3MTcuMTY0NDkyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.AqsHf_wNitBbMuJee8wPseueU5U2hzNxEDBb4anljJjJuQs4WYn0XsBdwBHILJXoqI06xTN3htBUk_bt_2bZT0mGSEWKEA7UMgKf5llPdr5TD_Guk0kwnVMyvDWaiH0UJw5WlyXCLE3NiChr1rTducfG9jcm1lCjvJaUDiF2QlS4YMii6mDv_OG5boR3E3p8nMyjQHcajF3oJ_VSAVKEBJVBDEHvI02bnY-40xskBP5r_IrRtVR9nVN-BUzR8JoHJiB709nSbAVQ8tKohsls4PzMoZ6HrTj7R5O3DZNNbfrjpOEyxK3ny7wF7w6wN1xwcB9ovJoMmyoiocv0PzHiVrZKGnMRmTXNP59zCLN6DMcnwx_cSrZ97qjLQMHf5KK8WmkjrinRqpllnP2TvbKwePvknQGKdyOx84ZIlHSv83jb2f3B2Mj59QGHW_dHDtbmNDK0seCBpQflzdgmL03RdAWk-vo-DUveKVivOhJIpjto0qb1cyAwmegPUCAiX7pWjKTTtuLTtDNGDOrS79Ky6BqN9TT5ikfhGnpzX24MORTO0BarY1ADMR2eI19w-Yj_2tcgdN9YHXmvQNtZmp0aTVfSoNpLiLJ7Y1NoKfZj9FbGrX6UwVLNOrEOZYMnnKw5PR9wZg1-EUl1NjDXxyuu-8GGjiXGyZQbVfXKR8phk9I",
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
