"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { testApi, useGetChatMessageQuery } from "@/store/api/testApi";

export default function Test() {
	const dispatch = useDispatch();
	const { data: messages, error, isLoading } = useGetChatMessageQuery();
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const dataLength = 40;

	const fetchMore = () => {
		console.log("fetchMore");
		setPage(page + 1);
	};

	useEffect(() => {
		if (page > 1) {
			dispatch(testApi.endpoints.getChatMoreMessage.initiate({ page }));
		}
	}, [page, dispatch]);

	useEffect(() => {
		if (messages?.data === dataLength) {
			setHasMore(false);
		}
	}, [messages?.data]);

	return (
		<div className="max-w-xl p-5">
			<div>{messages?.data?.length}</div>
			{isLoading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}
			<div className="h-[500px] overflow-y-auto" id="scrollableDiv">
				{!isLoading && messages?.data?.length && (
					<InfiniteScroll
						dataLength={messages?.data?.length}
						next={fetchMore}
						hasMore={hasMore}
						loader={<h4>Loading...</h4>}
						scrollableTarget="scrollableDiv"
					>
						{messages?.data?.map((message) => (
							<div
								key={message.id}
								className="border p-3 my-2 rounded "
							>
								<p>Bot:{message.bot_message}</p>
								<p>User:{message.user_message}</p>
							</div>
						))}
					</InfiniteScroll>
				)}
			</div>
		</div>
	);
}
