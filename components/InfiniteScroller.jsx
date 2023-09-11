"use client";
import { useRef, useEffect } from "react";
import Spinner from "./Spinner";

const InfiniteScroller = ({
	next,
	loader,
	setPage,
	hasMore,
	className,
	isLoading,
	dataLength,
	children,
}) => {
	const containerRef = useRef(null);

	const handleScroll = () => {
		const container = containerRef.current;
		if (container) {
			const scrollHeight = container.scrollHeight;
			const scrollTop = container.scrollTop;
			const clientHeight = container.clientHeight;
			const isAtBottom = scrollHeight - scrollTop === clientHeight;

			if (isAtBottom && !isLoading & hasMore) {
				setPage((prev) => prev + 1);
				next();
			}
		}
	};

	useEffect(() => {
		const container = containerRef.current;
		if (container && hasMore) {
			container.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (container && hasMore) {
				container.removeEventListener("scroll", handleScroll);
			}
		};
	}, [dataLength, hasMore]);

	return (
		<div
			className={`${className ? className : "h-full overflow-y-auto"}`}
			ref={containerRef}
		>
			{children}
			{isLoading && (
				<div className="flex justify-center items-center">
					<Spinner />
				</div>
			)}
		</div>
	);
};

export default InfiniteScroller;
