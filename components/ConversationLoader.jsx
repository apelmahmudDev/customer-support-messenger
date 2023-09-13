import Spinner from "./Spinner";

const ConversationLoader = ({ isLoading, isFetching }) => {
	return (
		<>
			{isLoading && (
				<div className="absolute top-0 left-0 w-full h-full  flex items-center justify-center">
					<Spinner />
				</div>
			)}
			{!isLoading && isFetching && (
				<div className="mx-auto">
					<Spinner />
				</div>
			)}
		</>
	);
};

export default ConversationLoader;
