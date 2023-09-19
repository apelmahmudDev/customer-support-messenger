import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTY5NDM4YTdkYWU3OGY0MWVkOTk0Y2ExZTE5NjU5MTNmM2M3OTBlZDg3NzZlZTgyMGQ1NTM2MDI3YmMyZTU3NTE0NzIyNWZjY2I3NGZmZjYiLCJpYXQiOjE2OTUxMTE4NzAuNDQyMDI5LCJuYmYiOjE2OTUxMTE4NzAuNDQyMDMxLCJleHAiOjE3MjY3MzQyNzAuNDM3ODY0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Cl-aPzyNab1Vgbn6k3Ug1a-PLR3MbtYzh7PGrvHrqfYeTKwNdYIZ6bqZY3JZrLWacNc6aRIK6bCaoDLhUO9rXIR64NZcvHS8OWdgUH13G4p-_76Bnmzg2gk0UBvz1vgsV-h_dmZXNpau5ZBHVtTItBhIupO7QKsj-Iag7HFLM3NaXWePBdRZu2CNxP_iwAl2IY7w0xhz8_16d18ncYpBeyAuQewr0G71wJsm6llgwIu48M9HS0ebfHo7tmKX22NspGaoQa3dOMvmnhT7uctu8og3m8zAXnGOeGNM_oloZdteyw8vcc4CwOy8xaxrDpvJoJNew4JZjnXQYJfx-eT2WGy8vjTjL9hXKm_LSwwSU9q0bg_AR8VbbnFGWCuvdXGbOhCYQ_fqU7pP9XAwElQJdoF3ncULqoGDsM3JKSJP46WBL17ptDk4A8kTQVHpRIzd7a2oY4mLZYCsG44jE_aSSH7RJsLrbOzmMMzHHgEIUMqKANwbAsEVG6K9-EhaOL80Nfm2JfSwy0D1o2xeP5aygjMc0VYRpY8X2Ym1l8Jkf56gWrEMFDQRSnItuBkEzx-DqzhtUOjqZw9KlNAzaEgoCXYW1pPQqXlnTUJ7_gwFp6cyrXm2hZjvrcPXP68_X1vIO1TwyGCppQlbNkBJpJv9pT_DQHndktqtu7ciaKd9aHY",
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
