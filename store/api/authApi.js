import { baseApi } from "./base";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        logOut: build.query({
            query: () => "user/logout",
        }),
    }),
    overrideExisting: false,
});

export const { useLazyLogOutQuery } = authApi;
