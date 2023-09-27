"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Conversation from "@/components/Conversation";
import AutoExpandingTextarea from "@/components/AutoExpandingTextarea";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/store/slices/authSlice";
import { getCookie } from "cookies-next";

const Home = () => {
	const dispatch = useDispatch();

	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/login");
		},
	});

	console.log("session", session);

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

	if (status === "loading") {
		return null;
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

export default Home;
