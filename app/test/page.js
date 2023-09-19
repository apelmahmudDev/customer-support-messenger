"use client";

import { chatApi } from "@/store/api/chatApi";
import { useGetPostQuery } from "@/store/api/testApi";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";

export default function Test() {
	const dispatch = useDispatch();
	const { data, error, isLoading } = useGetPostQuery();
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const dataLength = 100;

	// console.log(data?.length);

	const fetchMore = () => {
		console.log("fetchMore");
		setPage(page + 1);
	};

	useEffect(() => {
		if (page > 1) {
			dispatch(chatApi.endpoints.getMorePost.initiate({ page }));
		}
	}, [page, dispatch]);

	useEffect(() => {
		if (data?.length === dataLength) {
			setHasMore(false);
		}
	}, [data]);

	return (
		<div className="max-w-xl p-5">
			{isLoading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}
			<div className="h-[500px] overflow-y-auto" id="scrollableDiv">
				{!isLoading && data?.length && (
					<InfiniteScroll
						dataLength={data?.length}
						next={fetchMore}
						hasMore={hasMore}
						loader={<h4>Loading...</h4>}
						scrollableTarget="scrollableDiv"
					>
						{data?.map((item) => (
							<div
								key={item.id}
								className="border p-3 my-2 rounded "
							>
								{item.title}
							</div>
						))}
					</InfiniteScroll>
				)}
			</div>
		</div>
	);
}
