"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Conversation from "@/components/Conversation";
import AutoExpandingTextarea from "@/components/AutoExpandingTextarea";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "@/store/slices/authSlice";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import useAuthCheck from "@/hook/useAuthCheck";
import withAuth from "@/HOC/withAuth";
import Spinner from "@/components/Spinner";

const Home = () => {
	const authChecked = useAuthCheck()
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);

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
	}, [dispatch]);

	// if not token or user, redirect to login
	useEffect(() => {
		if (!auth?.token || !auth?.user) {
			redirect("/login");
		}
	}, [auth?.token, auth?.user]);

	if (!authChecked) {
		return <div className="h-screen w-full flex items-center justify-center">
			<Spinner />
		</div>
	}

	return (
		<div className="h-screen">
			<nav className="w-full bg-dark-primary">
				<Header />
			</nav>
			<section className="relative h-[calc(100%-56px)] overflow-hidden">
				<aside>
					<Sidebar />
				</aside>
				<main className="h-full flex flex-col overflow-hidden sm:ml-64">
					<Conversation />
					<div className="p-4 pt-0 mx-auto w-full max-w-screen-lg">
						<AutoExpandingTextarea />
					</div>
				</main>
			</section>
		</div>
	);
};

export default withAuth(Home);
