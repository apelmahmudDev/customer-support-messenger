"use client";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { BotTyping } from "./BotTyping";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import ConversationLoader from "./ConversationLoader";
import { storeMessages } from "@/store/slices/chatSlice";
import { chatApi, useGetChatHistoryQuery } from "@/store/api/chatApi";
import { testApi, useGetChatMessageQuery } from "@/store/api/testApi";

const Conversation = () => {
	const { conversationId } = useSelector((state) => state.chat);
	const { isBotTyping } = useSelector((state) => state.ui);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const dispatch = useDispatch();
	const timelineRef = useRef();

	// test start
	const {
		data: messages,
		errors,
		isError,
		isLoading,
		isSuccess,
	} = useGetChatMessageQuery(conversationId, {
		skip: !conversationId,
		refetchOnMountOrArgChange: true,
	}) || {};

	useEffect(() => {
		if (page > 1) {
			dispatch(
				testApi.endpoints.getChatMoreMessage.initiate({
					page,
					conversationId,
				})
			);
		}
	}, [page, dispatch, conversationId]);

	const fetchMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		if (
			!isLoading &&
			conversationId &&
			messages?.pagination?.total === messages?.data?.length
		) {
			setHasMore(false);
		}
	}, [
		messages?.data?.length,
		messages?.pagination?.total,
		isLoading,
		conversationId,
	]);

	// user interface decide what to render
	let content = null;
	if (!conversationId) {
		content = (
			<div className="conversation__content">
				<p className="text-gray-500">Select a conversation</p>
			</div>
		);
	}
	if (!conversationId && messages?.length > 0) {
		content = (
			<>
				<div className="flex-1 overflow-y-auto mx-auto w-full p-4 flex flex-col-reverse">
					{messages?.data
						.slice()
						.sort((a, b) => b.id - a.id)
						.map((chat) => (
							<div key={chat?.id}>
								{chat?.user_message && (
									<UserMessage chat={chat} />
								)}
							</div>
						))}
				</div>
				<div className="p-4">{isBotTyping && <BotTyping />}</div>
			</>
		);
	}
	if (isLoading) {
		content = (
			<div className="conversation__content">
				<ConversationLoader />
			</div>
		);
	}
	if (!isLoading && isError) {
		content = (
			<div className="conversation__content">
				<p className="text-gray-500">Select a conversation</p>
			</div>
		);
	}
	if (!isLoading && !isError && isSuccess && !messages?.data?.length) {
		content = (
			<div className="conversation__content">
				<p className="text-gray-500">No messages yet!</p>
			</div>
		);
	}
	if (!isLoading && !isError && isSuccess && messages?.data?.length > 0) {
		content = (
			<>
				<div
					ref={timelineRef}
					id="scrollableDiv"
					className="relative flex-1 overflow-y-auto mx-auto w-full p-4 flex flex-col-reverse"
				>
					<InfiniteScroll
						dataLength={messages?.data?.length}
						next={fetchMore}
						inverse={true}
						hasMore={hasMore}
						loader={<ConversationLoader infinite />}
						className="flex flex-col-reverse"
						scrollableTarget="scrollableDiv"
					>
						{messages?.data
							.slice()
							.sort((a, b) => b.id - a.id)
							.map((chat) => (
								<div key={chat?.id}>
									{chat?.user_message && (
										<UserMessage chat={chat} />
									)}
									{chat?.bot_message && (
										<BotMessage chat={chat} />
									)}
								</div>
							))}
					</InfiniteScroll>
				</div>
				<div className="p-4">{isBotTyping && <BotTyping />}</div>
			</>
		);
	}

	return <>{content}</>;
};

export default Conversation;
