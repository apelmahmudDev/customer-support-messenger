import InfiniteScroll from "react-infinite-scroll-component";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";

const Timeline = ({ messages, fetch, innerRef, hasMore, disabled }) => {
	return (
		<div
			id="scrollableDiv"
			ref={innerRef}
			className="flex-1 overflow-y-auto mx-auto w-full p-4 flex flex-col-reverse"
		>
			<InfiniteScroll
				dataLength={messages?.length}
				next={fetch}
				inverse={true}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				scrollableTarget="scrollableDiv"
				style={{ display: "flex", flexDirection: "column-reverse" }}
			>
				{messages?.map((chat) => (
					<div key={chat?.id}>
						{chat?.user_message && <UserMessage chat={chat} />}
						{chat?.bot_message && <BotMessage chat={chat} />}
					</div>
				))}
			</InfiniteScroll>
		</div>
	);
};

export default Timeline;
