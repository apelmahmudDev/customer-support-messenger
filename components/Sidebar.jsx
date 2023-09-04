"use client";
import { useState } from "react";
import { useGetChatConversationQuery } from "@/store/api/chatConversationApi";
import { useDeleteChatMutation } from "@/store/api/chatDeleteApi";
import { setOpenSidebar } from "@/store/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";

const chatItem = [
	{ id: 1, name: "Fab Chat" },
	{ id: 2, name: "New Chat" },
	{
		id: 3,
		name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, quis?",
	},
];

const Sidebar = () => {
	const dispatch = useDispatch();
	const { openSidebar } = useSelector((state) => state.ui);
	const [chatId, setChatId] = useState(null);
	const [deleteChat] = useDeleteChatMutation();
	const { data, isLoading } = useGetChatConversationQuery({ page: 1 });

	const handleSidebar = () => {
		dispatch(setOpenSidebar());
	};

	const handleSelectChat = (id) => {
		deleteChat({ chatId: id });
	};

	return (
		<div>
			<div
				onClick={handleSidebar}
				className={`${
					openSidebar ? "sidebar-overlay" : "hidden"
				} block sm:hidden`}
			></div>
			<div
				id="chat-sidebar"
				className={`absolute top-0 left-0 h-full z-40 w-64 pt-4 transition-transform bg-dark-secondary -translate-x-full sm:translate-x-0 ${
					openSidebar ? "translate-x-0" : "-translate-x-full"
				}`}
				aria-label="Sidebar"
			>
				<div className="flex flex-col h-full pb-4 overflow-hidden bg-dark-secondary">
					<ul
						id="chat-history"
						className="flex-1 px-3 font-medium overflow-hidden hover:overflow-y-auto"
					>
						{isLoading && (
							<div className="text-white text-sm md:text-base">
								Loading...
							</div>
						)}
						{data?.data.map((item) => (
							<li className="relative" key={item.id}>
								<div className="absolute flex items-center gap-2 z-40 top-0 right-0 bg-dark-secondary h-full">
									<button>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 22 22"
											strokeWidth="1.5"
											stroke="white"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
											/>
										</svg>
									</button>
									<button>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 22 22"
											strokeWidth="1.5"
											stroke="white"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</button>
								</div>
								<button
									onClick={() => handleSelectChat(item.id)}
									className="w-full flex items-center py-3 px-2 text-white break-all overflow-hidden text-ellipsis whitespace-nowrap hover:bg-lighter-gray rounded-md md:rounded-lg text-sm md:text-base"
								>
									{/* <div className="item-end_overlay absolute h-6 w-8 right-0"></div> */}
									<span className="shrink-0">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 26 26"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
											/>
										</svg>
									</span>
									<span className="ml-3 text-left">
										{item.title}
									</span>
								</button>
							</li>
						))}
					</ul>

					<button className="new-chat__button">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						<span>New Chat</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
