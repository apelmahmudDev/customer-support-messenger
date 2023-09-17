"use client";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
	chatHistoryApi,
	useGetChatHistoryQuery,
} from "@/store/api/chatHistoryApi";
import ConversationLoader from "./ConversationLoader";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import { storeMessages } from "@/store/slices/chatSlice";

const Conversation = () => {
	const { messages, conversationId } = useSelector((state) => state.chat);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const dispatch = useDispatch();
	const timelineRef = useRef();

	// fetch messages when conversationId changes
	const { data, isSuccess, isLoading, isFetching, isError, error } =
		useGetChatHistoryQuery({ conversationId }) || {};

	// initial store messages when conversationId changes
	useEffect(() => {
		if (
			conversationId &&
			isSuccess &&
			data?.response?.records?.data?.length > 0
		) {
			dispatch(storeMessages(data?.response?.records?.data));
		}
	}, [isSuccess, data?.response?.records?.data, dispatch, conversationId]);

	const fetchMore = () => {
		setPage((prevPage) => prevPage + 1);
	};

	// fetch more messages when page changes
	useEffect(() => {
		if (page > 1) {
			dispatch(
				chatHistoryApi.endpoints.getMoreChatHistory.initiate({
					conversationId,
					page,
				})
			);
		}
	}, [page, dispatch, conversationId]);

	// hasMore decide when to stop fetching
	useEffect(() => {
		if (data?.response?.records?.pagination?.total === messages?.length) {
			setHasMore(false);
		}
	}, [messages?.length, data?.response?.records?.pagination?.total]);

	// user interface decide what to render
	let content = null;
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
				<p className="text-gray-500">No messages yet!</p>
			</div>
		);
	}
	if (
		!isLoading &&
		!isError &&
		isSuccess &&
		!data?.response?.records?.data?.length
	) {
		content = (
			<div className="conversation__content">
				<p className="text-gray-500">
					No data?.response?.records?.data yet!
				</p>
			</div>
		);
	}
	if (
		!isLoading &&
		!isError &&
		isSuccess &&
		data?.response?.records?.data?.length > 0
	) {
		content = (
			<div
				ref={timelineRef}
				id="scrollableDiv"
				className="relative flex-1 overflow-y-auto mx-auto w-full p-4 flex flex-col-reverse"
			>
				<InfiniteScroll
					dataLength={messages?.length}
					next={fetchMore}
					inverse={true}
					hasMore={hasMore}
					loader={<ConversationLoader infinite />}
					className="flex flex-col-reverse"
					scrollableTarget="scrollableDiv"
				>
					{messages
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
		);
	}

	return <>{content}</>;
};

export default Conversation;
