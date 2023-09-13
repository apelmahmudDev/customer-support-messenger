import InfiniteScroll from "react-infinite-scroll-component";
import ConversationLoader from "./ConversationLoader";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";

const Timeline = ({
	messages,
	fetch,
	innerRef,
	hasMore,
	disabled,
	isLoading,
	isFetching,
}) => {
	return (
		<div
			ref={innerRef}
			id="scrollableDiv"
			className="relative flex-1 overflow-y-auto mx-auto w-full p-4 flex flex-col-reverse"
		>
			<InfiniteScroll
				dataLength={messages?.length}
				next={fetch}
				inverse={true}
				hasMore={hasMore}
				loader={
					(isLoading || isFetching) && (
						<ConversationLoader
							isFetching={isFetching}
							isLoading={isLoading}
						/>
					)
				}
				className="flex flex-col-reverse"
				scrollableTarget="scrollableDiv"
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
