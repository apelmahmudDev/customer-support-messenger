import Spinner from "./Spinner";

const ConversationLoader = ({ infinite }) => {
	return (
		<>
			{infinite ? (
				<div className="mx-auto">
					<Spinner />
				</div>
			) : (
				<div className="absolute top-0 left-0 w-full h-full  flex items-center justify-center">
					<Spinner />
				</div>
			)}
		</>
	);
};

export default ConversationLoader;
