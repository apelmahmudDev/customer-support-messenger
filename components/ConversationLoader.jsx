import Spinner from "./Spinner";

const ConversationLoader = () => {
	return (
		<div className="absolute top-0 left-0 w-full h-full  flex items-center justify-center">
			<Spinner />
		</div>
	);
};

export default ConversationLoader;
