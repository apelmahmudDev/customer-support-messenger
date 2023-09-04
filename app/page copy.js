"use client";
import { useState } from "react";
import Header from "@/components/Header";
import AutoExpandingTextarea from "@/components/AutoExpandingTextarea";
import Sidebar from "@/components/Sidebar";
import Conversation from "@/components/Conversation";
import { useGetChatConversationQuery } from "@/store/api/chatConversationApi";

export default function Home() {
	const [openSidebar, setOpenSidebar] = useState(false);
	const { data, isLoading, isSuccess, isError, error } =
		useGetChatConversationQuery({ page: 1 });

	console.log("data", data);
	return (
		<div>
			<nav className="fixed top-0 z-50 w-full bg-dark-primary">
				<Header setOpenSidebar={setOpenSidebar} />
			</nav>

			<aside
				id="chat-sidebar"
				className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-dark-secondary border-r -translate-x-full sm:translate-x-0 ${
					openSidebar ? "translate-x-0" : "-translate-x-full"
				}`}
				aria-label="Sidebar"
			>
				<Sidebar />
			</aside>

			<main className="h-[calc(100vh-56px)] p-4 sm:ml-64">
				<div className="flex flex-col p-4 mt-14 h-full">
					<div className="flex-1 ">
						<Conversation />
						<Conversation />
						<Conversation />
						<Conversation />
					</div>
					<div>
						<AutoExpandingTextarea />
					</div>
				</div>
			</main>
		</div>
	);
}
