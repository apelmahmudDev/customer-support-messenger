import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzZjMDk1OGRhOTYwMWYzMjU5N2QyMTA4ODhkNWFkM2M4MjQ3ODkyODgzMWJjZjJlYmE1NjBhZGViNzgzMTI1YjJjMWU1MGI3ZjU2Yjc5Y2MiLCJpYXQiOjE2OTUyODU5NzUuODE5MTM5LCJuYmYiOjE2OTUyODU5NzUuODE5MTQyLCJleHAiOjE3MjY5MDgzNzUuODE0MjAzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.JCNg3fBVhpLIUUiR1CEXerseYgbDN3whSJC8qrhMEEgUzmmuy8Q4eIV69K3fwFYP8yvQD0dsl7nrM9Dk3YHg-SVxigfIWPy9mIaIe3KgHyh1FLAYRd2UQzQqYky4Fr-u0OqDZDYZ960ElY69BfROzlHItrNbbY76wxumfzBqSmiZ0pZDHx-6zk1-86VwTOv8Nu-yNeNe5sY6ipMHUQov9YXjNaVLmXx38UMAFmx8I3O3jr721dbKmiwX73vJ-90_R3hrKbkeLGyo7DS49lej_sLQMNFsafe-st3mVk5PH1nKw5temdS6JDOQPihfY4XmPEJuc6RyBU-6CFbEU2Hp9w8GFbi81HzQC7Cepd5SHD6UmUxWRwVLGYRGTJp5-nzHXWZcc5-jUfphJjzjqZxMLB1zWa8UPz5jmztmfLRpNglR8S9tes4sAXh4zZr1uZeIVLwE67rmNFRK2LPaQFRtSewQkV8ZMcKfkuinlF1SYtUchCz8yiJQvBkU_vEI2RMMC1Jsfu0Ok_Xx2vrk8YTP-Iv01cFtJUe1Kl1JEEKNrQchXKL1XMVg-tIhh9gH6kV22w9VplvdmTJmcXCc3iEKalLjOYjzM2DHmXLyD1oaLwU3qqDjnAhaPIvb9qoWeydbIfTyaozr4FNT6tCxUHes3c2dh-KSOU-i_LB0iznx-ls",
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
