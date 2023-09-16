"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetChatConversationQuery } from "@/store/api/chatConversationApi";
import { storeConversationId } from "@/store/slices/chatSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import NewChatButton from "./NewChatButton";
import Spinner from "./Spinner";
import ListItem from "./ListItem";
import { setOpenSidebar } from "@/store/slices/uiSlice";
import { useDeleteChatMutation } from "@/store/api/chatDeleteApi";

const Sidebar = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [chatHistory, setChatHistory] = useState([]);
	const [selectedId, setSelectedId] = useState(null);
	const { openSidebar } = useSelector((state) => state.ui);
	const [deleteChat] = useDeleteChatMutation();

	const { data, isLoading, isFetching, isSuccess } =
		useGetChatConversationQuery({
			page: page,
		});

	useEffect(() => {
		if (isSuccess) {
			setChatHistory(data?.data);
		}
	}, [isSuccess, data?.data]);

	useEffect(() => {
		if (page > 1 && isSuccess) {
			const uniqueMessages = data?.data?.filter(
				(item) => !chatHistory?.some((item2) => item?.id === item2?.id)
			);
			setChatHistory((prev) => [...prev, ...uniqueMessages]);
		}
	}, [page, isSuccess, data?.data, chatHistory]);

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
	}, [chatHistory, data?.pagination?.total]);

	// All handlers are here
	const handleSelectChatId = (id) => {
		setSelectedId(id);
		dispatch(storeConversationId(id));
	};

	const handleDeleteChat = (id) => {
		deleteChat({ chatId: id });
	};

	const handleSidebar = () => {
		dispatch(setOpenSidebar());
	};

	const handleNewChat = () => {
		dispatch(storeConversationId(null));
		dispatch(setOpenSidebar());
		setSelectedId(null);
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
					<div
						id="chatSidebarScrollableDiv"
						className="flex-1 px-3 font-medium overflow-hidden hover:overflow-y-auto"
					>
						<InfiniteScroll
							dataLength={chatHistory?.length || []}
							next={handleFetChatHistory}
							hasMore={hasMore}
							loader={
								<div className="flex justify-center h-full items-center">
									<Spinner />
								</div>
							}
							scrollableTarget="chatSidebarScrollableDiv"
							scrollThreshold={1}
						>
							{chatHistory?.map((item) => (
								<ListItem
									key={item?.id}
									id={item?.id}
									title={item?.title}
									selectedId={selectedId}
									handleDeleteChat={handleDeleteChat}
									handleSelectChatId={handleSelectChatId}
								/>
							))}
						</InfiniteScroll>
					</div>
					<NewChatButton onClick={handleNewChat} />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
