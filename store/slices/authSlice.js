import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjQzNmY4NmEyYjUwNjk1NThmYzVjODIxOTA4MDA3OWZlODRhNmI0ZmMwYTMxZDI3ZThjYjFiYjgxYjEyMmEzMWMyZTU5N2IwNDQ4OTAwMDMiLCJpYXQiOjE2OTQ2NjE0MzEuOTgzNTkyLCJuYmYiOjE2OTQ2NjE0MzEuOTgzNTk0LCJleHAiOjE3MjYyODM4MzEuOTc4NDcsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.dXNaTTn9TV0Jcl5W-JeA38COWCQKHu7tCALuR1qL4b3f03oQO4oOgVWxQ8n52Cd5xeyAozjqYptP0C-MIDuyxZnVR55nxPep6ouqtropyUdnvoRutmhUXGxr2ZMbgGo4DxqD7xKn6f3WwrzDOnaDGrIdxHXoxG-q4IelMf6meC8OY6EvISXJLlhHO_kYjZbmSGh60AMZ7uQKDijWF2uNiUNVRwvuLtkkf6PH-ymhdUYmbvc0a9soqAfnrJ3_x2Z3UN4byfF6Nkt-rjql6RHkmnMNYT_dao3SPHqisBd-W-WW_OPP7qcUwTs9sLLVSitReHfohjKmWCLGeap3Mj1kZOsw50aBPJBerSN6PS1u5duaY6qRXXPJiMwSjCfFTTzNu827v3Z7ZjNyo8hvUOW3kOTbFEH-glqN-m5haH6ycgHOSJ2UW_3abbwJukEeFV8hMcdfo_z1BX6oJ9AB0MmFWQx2ZYX2YmJg_3xDR6Xhw1k8IpqlNjIKKbae30z-UXQep1r-qGb275Mek3KYoUJlOARysYHmJyjaqA2KWqZTO9eT81CUbx-VTs3Jy9YWy206boxyHckzaLYe0ZqvyrBAKW8Pg8a56E-Yg7A8P1DHUnmSF5SnK7mwNG--fWu0moZ37XNgHjd0JWADknlsjhi-lyeU87Q2_fN8ILR2PcguLm8",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
