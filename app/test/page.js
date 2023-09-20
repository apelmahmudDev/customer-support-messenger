"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { testApi, useGetConversationQuery } from "@/store/api/testApi";
import TempInput from "@/components/TempInput";
const conversationId = 52;
export default function Test() {
	const dispatch = useDispatch();
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);

	const {
		data: conversation,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGetConversationQuery();

	const fetchMore = () => {
		console.log("fetchMore");
		setPage(page + 1);
	};

	useEffect(() => {
		if (page > 1) {
			dispatch(testApi.endpoints.getMoreConversation.initiate(page));
		}
	}, [page, dispatch]);

	useEffect(() => {
		if (
			!isLoading &&
			conversation?.pagination?.total === conversation?.data?.length
		) {
			setHasMore(false);
		}
	}, [conversation, isLoading]);

	return (
		<div className="max-w-xl p-5">
			<div>{conversation?.data?.length}</div>
			{isLoading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}
			<div className="h-[500px] overflow-y-auto" id="scrollableDiv">
				{!isLoading && conversation?.data?.length && (
					<InfiniteScroll
						dataLength={conversation?.data?.length}
						next={fetchMore}
						hasMore={hasMore}
						loader={<h4>Loading...</h4>}
						scrollableTarget="scrollableDiv"
					>
						{conversation?.data?.map((c) => (
							<div
								key={c?.id}
								className="border p-3 my-2 rounded "
							>
								<p>User:{c?.title}</p>
							</div>
						))}
					</InfiniteScroll>
				)}
			</div>
			<TempInput />
		</div>
	);
}
