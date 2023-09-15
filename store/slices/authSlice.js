import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token:
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzI3NWI4MWQ2MGU3YzE2NjU5NDI0MDg3YjQyN2VmZTA5N2M2YzY3N2NmNWI5MTIzNzk4NDgzZGYxNzMwNzg5YmQxMDcwODJjZjQ2MDE1MDUiLCJpYXQiOjE2OTQ2ODI0NDQuODA1Mjc1LCJuYmYiOjE2OTQ2ODI0NDQuODA1Mjc4LCJleHAiOjE3MjYzMDQ4NDQuNzk0ODMzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.GmlYIyw2Mw1Q1H9rv3ArzIPAUw86yYRe8TFNOUL242QoICCYy-cmZLUV-_94g_Zmd-im9W6-OXH45xeBcwl4wyfNVUjCgoX1oIOq-pvgHQooqS4rAA2RtOibxMa8rjewKJKuzrlgg7fXkK9q_CaQa1OuBZvvNktvQp8jX6UBX_ZbKRd9AndgSQ7QoGRrMkkU0B6ycU3sEtYrfyLQV95IbcZNpH8Co8jqvirIDRL3L3qIkC4wruEYLKN9DaT6Wgg0yk_bUG3cKjXs32pGpptN3cGi_ZyVpJd3b7OF-o32BMHeaHeMv93Tso-T6deSi5Li9hzL_-WC9ThMdfUkHCaznz2dXmbViEp8OYz9gPA727JWx1vwvpt4Q2l7J6GJ6A51Ae-ERtAWhQ5YKfnV7fmlbmFKZMeswSG78gI3HtKrJMLxfvCgW7ZfgjLu-AO3i6pZVWkLBEmxNOhB4Nbrz8Xk-6lHGFCYzCejLoAahVoLS4Qhjlad8CyQV4TBKOUOdLTXqnPCB9FY6yh6swyWT0K0lHPnXEcVU-svOlcZXtZAz6JXobKZ1Y6kNJeDVsJz2J0lghgz5sQt1kaYNeZGCKUuqO1m-bV6uJZzgw2q7Rvbws11QVuN3e1ThYqH_Q9REzkwv8QGPxdJeXV5c54v7k2rfTortrKWtgzH05xTeYzH8XI",
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
