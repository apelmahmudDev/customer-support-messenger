import { apiSlice } from "./apiSlice";
import { userLoggedIn } from "../slices/authSlice";
import { setCookie } from "cookies-next";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
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
		login: builder.mutation({
			query: (data) => ({
				url: "/login",
				method: "POST",
				body: data,
			}),
			transformResponse: (response) => response?.response?.records,

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;

					setCookie("token", result.data.token);
					setCookie("user", {
						name: result.data.name,
						email: result.data.email,
						picture: result.data.picture,
						status: result.data.status,
						user_id: result.data.user_id,
					});

					dispatch(
						userLoggedIn({
							token: result.data.token,
							user: {
								name: result.data.name,
								email: result.data.email,
								picture: result.data.picture,
								status: result.data.status,
								user_id: result.data.user_id,
							},
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
