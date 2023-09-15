import { baseApi } from "./base";

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		register: build.mutation({
			query: (data) => ({
				url: "/register",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					localStorage.setItem(
						"auth",
						JSON.stringify({
							token: result.data.token,
							user: result.data.user,
						})
					);

					dispatch(
						userLoggedIn({
							token: result.data.token,
							user: result.data.user,
						})
					);
				} catch (err) {
					// do nothing
				}
			},
		}),
		login: build.mutation({
			query: (data) => ({
				url: "/login",
				method: "POST",
				body: data,
			}),

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					localStorage.setItem(
						"auth",
						JSON.stringify({
							token: result.data.token,
							user: result.data.user,
						})
					);

					dispatch(
						userLoggedIn({
							token: result.data.token,
							user: result.data.user,
						})
					);
				} catch (err) {
					// do nothing
				}
			},
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
