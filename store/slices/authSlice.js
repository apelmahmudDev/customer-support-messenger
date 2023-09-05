import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token:
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzdmOGU0MTJiODc2Y2Y1NGY3MTdlODljMzFjNmE1MGNjOGY0MDZkMWZiNDVhMDAwNmZlZTY3YjlhYWQ5MzdlNDJhNTM1NDEwZGMzOTU3ZGMiLCJpYXQiOjE2OTM5MDYyMjguNDQ5OTU1LCJuYmYiOjE2OTM5MDYyMjguNDQ5OTU3LCJleHAiOjE3MjU1Mjg2MjguNDQ1OTQzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.SckM1k__9Jq3BVvq_HbBveLdoxJCw32DB3YMay6bcyozK9EIE_1s0Gy5YE2hUVWdtS2c8tpks_nKp7JV7R1LLI9Cf_6Z_DJMunepaFsXmSS2-RJ5yh9n7FmpVelbQA5A_J9hxf1a4_QgDTVDpTuZRj_M8eee2qll2DNbb_yyt1X1oKQuZV6FGWWqD2t_dm1gTY7tbk9LmKX0xzKDhvW5bKAf5Ykdop9T8e3ZhnO4Jb1hqt3MSkzwMD-3FbPkF1I8wgJVd71JzubvaVaTkAAdz1n-50DWmP0Z-23YpqesZoetNx-1owK8qOYiBBBI5ssauq99Xr5TrOVEjMYHkeeBaRgT2l-pb_IXuSiGhRwu3pTx7fb7aF0llKZ71NOixMiRyLI0KzSc-17BQGm0OFQSxevjjoCHOx4IEYS7CmkNu1uplWntM1HxRPMASpVoZbShAEfTB76cF7Pm3zGB6FCWFbuhP8B-xpvsqvelNdLZZ2h2JKK1VCCBAgMh4iZ_aEnz-RwYF0uWANG6ze9ursgwkP0hTpQ-YMWADmdGNdpOQ7zWuh9VwqFI8Fz8YJ8CTcnj_eF1TnVLwujkq0imuS7_FTTLzdpieMHWluMBZWwfwvWoXJlEwE97WJG6jfhTWfsAc18t0bJSoTZg0Tyu6yT4R7-reOGBmXqKp6YpF5tI9uI",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
