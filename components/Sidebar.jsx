"use client";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Dialog from "./Dialog";
import ListItem from "./ListItem";
import RetryIcon from "./RetryIcon";
import NewChatButton from "./NewChatButton";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "@/store/slices/uiSlice";
import { useDeleteChatMutation } from "@/store/api/chatApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { testApi, useGetConversationQuery } from "@/store/api/testApi";
import { resetMessages, storeConversationId } from "@/store/slices/chatSlice";

const Sidebar = () => {
	const dispatch = useDispatch();
	const { openSidebar } = useSelector((state) => state.ui);
	const { conversationId } = useSelector((state) => state.chat);

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [deleteId, setDeleteId] = useState(null);
	const [isDelete, setIsDelete] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);

	const [deleteChat, { isLoading: isDeleting }] = useDeleteChatMutation();
	const {data: conversation, isLoading, isSuccess, isError, error, refetch } = useGetConversationQuery();


	// decide what to fetch more conversation start
	useEffect(() => {
		if (page > 1) {
			dispatch(testApi.endpoints.getMoreConversation.initiate(page));
		}
	}, [page, dispatch]);

	const fetchMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		if(
			!isLoading &&
			conversation?.pagination?.total === conversation?.data?.length
		) {
			setHasMore(false);
		}
	}, [conversation?.data?.length, conversation?.pagination?.total, isLoading]);

	// decide what to fetch more conversation end

	// delete chat after confirmation
	useEffect(() => {
		if (isDelete) {
			deleteChat({ chatId: deleteId });
			setIsDelete(false);
			setDeleteId(null);
			setOpenDialog(false);
		}
	}, [isDelete, deleteId, deleteChat]);

	// useEffect(() => {
	// 	if (isDelete) {
	// 		dispatch(storeConversationId(null));
	// 	}
	// }, [isDelete, dispatch]);

	// All handlers are here
	const handleSelectChatId = (id) => {
		setSelectedId(id);
		dispatch(storeConversationId(id));
	};

	const handleDeleteChat = (id) => {
		setDeleteId(id);
		setOpenDialog(true);
	};

	const handleCancel = () => {
		setOpenDialog(false);
		setDeleteId(null);
	};

	const handleSidebar = () => {
		dispatch(setOpenSidebar());
	};

	const handleNewChat = () => {
		dispatch(resetMessages());
		dispatch(storeConversationId(null));
		dispatch(setOpenSidebar());
		setSelectedId(null);
	};

	useEffect(() => {
		if (!selectedId && conversationId) {
			setSelectedId(conversationId);
		}
	}, [selectedId, conversationId]);

	// user interface decide what to render
	let render = null;
	if (isLoading) {
		render = (
			<div className="center__hw">
				<Spinner />
			</div>
		);
	}

	if (isError) {
		render = (
			<div className="center__hw">
				<button onClick={() => refetch()}>
					<RetryIcon />
				</button>
			</div>
		);
	}

	if (isSuccess) {
		render = (
			<InfiniteScroll
				dataLength={conversation?.data?.length}
				next={fetchMore}
				hasMore={hasMore}
				loader={<div className="center__hw"><Spinner /></div>}
				scrollableTarget="chatSidebarScrollableDiv"
			>
				{conversation?.data?.map((item) => (
					<ListItem
						key={item?.id}
						id={item?.id}
						title={item?.title}
						isDeleting={isDeleting}
						selectedId={selectedId}
						handleDeleteChat={handleDeleteChat}
						handleSelectChatId={handleSelectChatId}
					/>
				))}
			</InfiniteScroll>
		);
	}

	return (
		<div>
			<div
				onClick={handleSidebar}
				className={`${ openSidebar ? "sidebar-overlay" : "hidden" } block sm:hidden`}
			></div>
			{openDialog && (
				<Dialog handleCancel={handleCancel} setIsDelete={setIsDelete} />
			)}
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
						{render}
					</div>
					<NewChatButton onClick={handleNewChat} />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
