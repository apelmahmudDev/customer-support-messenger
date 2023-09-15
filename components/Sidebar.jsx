"use client";
import { useEffect, useState } from "react";
import { useGetChatConversationQuery } from "@/store/api/chatConversationApi";
import InfiniteScroll from "react-infinite-scroll-component";
import NewChatButton from "./NewChatButton";
import Spinner from "./Spinner";
import ListItem from "./ListItem";

const Sidebar = () => {
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [chatHistory, setChatHistory] = useState([]);

	const { data, isLoading, isFetching, isSuccess } =
		useGetChatConversationQuery({
			page: page,
		});

	useEffect(() => {
		if (isSuccess) {
			setChatHistory(data?.data);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (page > 1 && isSuccess) {
			const uniqueMessages = data?.data?.filter(
				(item) => !chatHistory?.some((item2) => item?.id === item2?.id)
			);
			setChatHistory((prev) => [...prev, ...uniqueMessages]);
		}
	}, [page, isSuccess, data?.data]);

	const handleFetChatHistory = () => {
		if (chatHistory?.length < data?.pagination?.total) {
			setHasMore(true);
			setPage(page + 1);
		} else {
			setHasMore(false);
		}
	};

	useEffect(() => {
		if (data?.pagination?.total === chatHistory?.length) {
			setHasMore(false);
		}
	}, [chatHistory]);

	console.log("chatHistory", chatHistory);
	return (
		<div>
			<div
				className={`${false ? "sidebar-overlay" : "hidden"} block sm:hidden`}
			></div>

			<div
				id="chat-sidebar"
				className={`absolute top-0 left-0 h-full z-40 w-64 pt-4 transition-transform bg-dark-secondary -translate-x-full sm:translate-x-0 ${
					false ? "translate-x-0" : "-translate-x-full"
				}`}
				aria-label="Sidebar"
			>
				<div className="flex flex-col h-full pb-4 overflow-hidden bg-dark-secondary">
					<div
						id="chatSidebarScrollableDiv"
						className="flex-1 px-3 font-medium overflow-hidden hover:overflow-y-auto"
					>
						<InfiniteScroll
							dataLength={chatHistory?.length || []}
							next={handleFetChatHistory}
							hasMore={hasMore}
							loader={
								isFetching && (
									<div className="flex justify-center h-full items-center">
										<Spinner />
									</div>
								)
							}
							scrollableTarget="chatSidebarScrollableDiv"
							scrollThreshold={1}
						>
							{chatHistory?.map((item) => (
								<ListItem key={item?.id} id={item?.id} title={item?.title} />
							))}
						</InfiniteScroll>
					</div>
					<NewChatButton />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
