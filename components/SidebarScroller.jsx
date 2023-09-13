import InfiniteScroll from "react-infinite-scroll-component";
import ListItem from "./ListItem";
import Spinner from "./Spinner";

const SidebarScroller = ({
	data,
	fetch,
	hasMore,
	disabled,
	isLoading,
	isFetching,
}) => {
	return (
		<InfiniteScroll
			dataLength={data?.length}
			next={fetch}
			hasMore={hasMore}
			loader={isLoading && <Spinner />}
			scrollableTarget="chatSidebarScrollableDiv"
			scrollThreshold={1}
		>
			{data?.map((item) => (
				<ListItem key={item?.id} id={item?.id} title={item?.title} />
			))}
		</InfiniteScroll>
	);
};

export default SidebarScroller;
