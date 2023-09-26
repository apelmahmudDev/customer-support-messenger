import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const options = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "jhon@gmail.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "********",
				},
			},
			async authorize(credentials) {
				const res = await fetch(
					"https://staging.artifism.techvill.net/api/V1/login",
					{
						method: "POST",
						body: JSON.stringify(credentials),
						headers: { "Content-Type": "application/json" },
					}
				);
				const user = await res.json();

				if (user?.response?.status?.message === "OK") {
					return {
						id: user?.response?.records?.user_id,
						name: user?.response?.records?.name,
						email: user?.response?.records?.email,
						image: user?.response?.records?.picture,
						access_token: user?.response?.records?.token,
					};
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			// user is only available the first time a user signs in authorized
			if (user) {
				return {
					...token,
					id: user.id,
					access_token: user.access_token,
				};
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token) {
				session.id = token.id;
				session.access_token = token.access_token;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};
