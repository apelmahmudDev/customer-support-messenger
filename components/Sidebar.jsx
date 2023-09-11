"use client";
import { useState, useEffect } from "react";
import { useGetChatConversationQuery } from "@/store/api/chatConversationApi";
import { useUpdateChatMutation } from "@/store/api/chatUpdateApi";
import { useDeleteChatMutation } from "@/store/api/chatDeleteApi";
import { storeConversationId } from "@/store/slices/chatSlice";
import { setOpenSidebar } from "@/store/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "./CheckIcon";
import CloseIcon from "./CloseIcon";
import EditIcon from "./EditIcon";
import TrashIcon from "./TrashIcon";
import MessageIcon from "./MessageIcon";
import InfiniteScroller from "./InfiniteScroller";

const Sidebar = () => {
	const dispatch = useDispatch();
	const { conversationId } = useSelector((state) => state.chat);
	const { openSidebar } = useSelector((state) => state.ui);
	const [isInputFocused, setInputFocused] = useState(false);
	const [conversation, setConversation] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [selectedId, setSelectedId] = useState(null);
	const [enableEdit, setEnableEdit] = useState(false);
	const [value, setValue] = useState("");

	// API endpoint method for delete chat
	const [deleteChat] = useDeleteChatMutation();
	const { data, isLoading, isFetching } = useGetChatConversationQuery({
		page: page,
	});

	// API endpoint method for update chat
	const [updateChat] = useUpdateChatMutation();

	const handleDeleteChat = () => {
		deleteChat({
			chatId: selectedId,
		});
	};

	// console.log("value", data);
	const handleUpdateChat = () => {
		updateChat({
			chatId: selectedId,
			name: value,
		});
	};

	const handleInputFocus = () => {
		setInputFocused(true);
	};

	const handleInputBlur = () => {
		setInputFocused(false);
		// setEnableEdit(false);
	};

	const handleSidebar = () => {
		dispatch(setOpenSidebar());
	};

	const handleSelectConversation = (conversation) => {
		dispatch(storeConversationId(conversation?.id));
		setSelectedId(conversation?.id);
		setValue(conversation.title);
		dispatch(setOpenSidebar());
	};

	const handleSubmitUpdate = () => {
		console.log("click");
		// const updatedConversation = {
		// 	chatId: selectedId,
		// 	name: value,
		// };
		// console.log(updatedConversation);

		handleUpdateChat();
		setEnableEdit(false);
	};

	const handleEnableEdit = () => {
		setEnableEdit(true);
	};

	// handle new chat
	const handleNewChat = () => {
		dispatch(storeConversationId(null));
		setSelectedId(null);
		setValue("");
		dispatch(setOpenSidebar());
	};

	// auto select first conversation
	useEffect(() => {
		if (conversationId && data?.data?.length > 0) {
			setSelectedId(conversationId);
		}
	}, [conversationId, data?.data?.length]);

	// Load more data
	useEffect(() => {
		loadItems();
	}, [data?.data]);

	useEffect(() => {
		if (
			!isLoading &&
			!isFetching &&
			data?.pagination?.next_page_url == null
		) {
			setHasMore(false);
		}
	}, [data?.data, isFetching, isLoading, hasMore]);

	const loadItems = () => {
		if (data) {
			const newItems = [...conversation, ...data?.data];
			const uniqueProducts = newItems.filter(
				(product, index, self) =>
					index === self.findIndex((p) => p.id === product.id)
			);
			setConversation(uniqueProducts);
		}
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
					<InfiniteScroller
						dataLength={conversation.length}
						next={loadItems}
						setPage={setPage}
						isLoading={isLoading || isFetching}
						hasMore={hasMore}
						className="flex-1 px-3 font-medium overflow-hidden hover:overflow-y-auto"
					>
						<ul>
							{conversation?.map((item) => (
								<li
									onClick={() =>
										handleSelectConversation(item)
									}
									key={item.id}
									className={`relative flex items-center gap-1 text-white break-all overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-sm md:text-base cursor-pointer px-2 py-3 ${
										selectedId == item?.id
											? "bg-lighter-gray hover:bg-lighter-gray"
											: "bg-transparent hover:bg-lighter-gray/40"
									}`}
								>
									{enableEdit && selectedId == item.id ? (
										<input
											className={`focus:outline-0 focus:border focus:border-white/10 focus:rounded-sm w-[calc(100%-43px)] bg-lighter-gray text-white text-sm md:text-base break-all`}
											type="text"
											autoFocus
											value={value}
											onChange={(e) =>
												setValue(e.target.value)
											}
											onFocus={handleInputFocus}
											onBlur={handleInputBlur}
										/>
									) : (
										<span
											className="flex items-center gap-1"
											onClick={() => setEnableEdit(false)}
										>
											<MessageIcon />
											{item?.title}
											{/* {selectedId === item?.id && value.length
											? value
											: item?.title} */}
										</span>
									)}

									{selectedId == item?.id && (
										<div>
											{enableEdit ? (
												<div className="absolute z-40 top-0 right-0 flex gap-0.5 justify-end h-full w-16 bg-gradient-to-l from-lighter-gray from-65%">
													<button
														onClick={
															handleSubmitUpdate
														}
													>
														<CheckIcon />
													</button>
													<button
														onClick={() =>
															setEnableEdit(
																(prev) => !prev
															)
														}
													>
														<CloseIcon />
													</button>
												</div>
											) : (
												<div className="absolute z-40 top-0 right-0 flex gap-0.5 justify-end h-full w-16 bg-gradient-to-l from-lighter-gray from-65%">
													<button
														onClick={
															handleEnableEdit
														}
													>
														<EditIcon />
													</button>
													<button
														onClick={
															handleDeleteChat
														}
													>
														<TrashIcon />
													</button>
												</div>
											)}
										</div>
									)}
								</li>
							))}
						</ul>
					</InfiniteScroller>

					<button
						onClick={handleNewChat}
						className="new-chat__button"
					>
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
