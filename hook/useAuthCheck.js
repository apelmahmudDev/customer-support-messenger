"use client";
import { userLoggedIn } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "cookies-next";

export default function useAuthCheck() {
	const dispatch = useDispatch();
	const [authChecked, setAuthChecked] = useState(false);

	useEffect(() => {
		const cookieUser = getCookie("user");
		const token = getCookie("token");

		if (token && cookieUser) {
			const user = JSON.parse(cookieUser);
			if (token && user) {
				dispatch(
					userLoggedIn({
						token,
						user,
					})
				);
			}
		}
		setAuthChecked(true);
	}, [dispatch, setAuthChecked]);

	return authChecked;
}
