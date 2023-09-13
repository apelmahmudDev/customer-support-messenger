"use client";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetChatHistoryQuery } from "@/store/api/chatHistoryApi";
import Timeline from "./Timeline";

const Conversation = () => {
	const { conversationId } = useSelector((state) => state.chat);
	const [messages, setMessages] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const timelineRef = useRef();

	// fetch messages when conversationId changes
	const { data, isSuccess, isLoading, isFetching } = useGetChatHistoryQuery(
		{
			conversationId,
			page: page,
		},
		{ skip: !conversationId }
	);

	// first time load message and then when page changes load more messages
	useEffect(() => {
		if (isSuccess) {
			setMessages(data?.data);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (page > 1 && isSuccess) {
			// unique messages only
			const uniqueMessages = data?.data?.filter(
				(item) => !messages?.some((item2) => item?.id === item2?.id)
			);
			setMessages((prev) => [...prev, ...uniqueMessages]);
		}
	}, [page, isSuccess, data?.data]);

	const fetch = () => {
		if (messages?.length < data?.pagination?.total) {
			setHasMore(true);
			setPage(page + 1);
		} else {
			setHasMore(false);
		}
	};

	// when all messages are loaded then hasMore is false
	useEffect(() => {
		if (data?.pagination?.total === messages?.length) {
			setHasMore(false);
		}
	}, [messages]);

	// if conversationId changes then reset page and messages
	useEffect(() => {
		setPage(1);
		setMessages([]);
	}, [conversationId]);

	return (
		<Timeline
			fetch={fetch}
			hasMore={hasMore}
			messages={messages}
			innerRef={timelineRef}
			isLoading={isLoading}
			isFetching={isFetching}
		/>
	);
};

export default Conversation;
