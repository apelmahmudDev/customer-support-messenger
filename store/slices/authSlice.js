import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token:
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYWZiNTAzMmI4MzNkZjc5NzE1OGMxM2JhNmIxOWQ4YjZmMDRkYjQwZWVlMGM4ZWI1MGFiMTU1YzEzODFhMjlkNjkyODk3ODA1ZjJjODg0YzMiLCJpYXQiOjE2OTQ4NzAxMzMuMTgzNzYsIm5iZiI6MTY5NDg3MDEzMy4xODM3NjIsImV4cCI6MTcyNjQ5MjUzMy4xNzY1NDksInN1YiI6IjEiLCJzY29wZXMiOltdfQ.QrJz61aB5PhwQOvuL9XkEx4V5g-lpFIhbztz5vsmVR-xPAtTUzTKQVXD_5uxdOmr4U9mc2nm39SJX-tlgMEBx54r3luI6RJVGT2uCvheTGQpdY5bsw-YB3SqXsnufOvRfYe2oYIW05kodfO2z4LAxt0huJJ_BCJLDUP88dq4mrNFP_Yn720sy9JUIwf4ZxO0H6dWZ9_py-6_ySXE8uJPzUdoIVfpn8iOmE2tHuLsibN9P9v_xn9YToFXTo8IUf96HCsG_agCN6qEEUusxFTpGRRZfMEBWVVoKP7cJimkrXaVRt74tWY12OxvRifjWwK2UDKlCtjTHAhjitZCxUAHRZR1hSCVNF7aqkER-F7e0oFGVRS0NnR2mC8JUx1t_63WUoPudECVrbJeRmaLUvwNiL2D4LsK_9Ei2Q8s59IDDJKjMV_rUJJgU2t_4_rD8-A_OKO_qbwpng8GhmVcJQaF1LSlgJSu3GZtYqrAVAyUfs2qbr8ARBA2FMW0ZmFLLfNJuGNBIBOgk9SnUfil7FcJQwW3tG75IIAZkQVAH21UJBqjYZJ4m5i7sx7G83lWWJD-UaGro0FOEQ9xiPWebJmriykiGaN_pMXNrTV51GmAp2cZNmX82oYKM4Ks8xNKsC9bHQR1unESM5cMQ9ocXfDW_kzdHs6XEzvZoh3fwUMU5jo",
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
