import formatTimeAgo from "@/lib/formatTime";
import Image from "next/image";

const UserMessage = ({ chat }) => {
	return (
		<div className="mb-4 flex gap-2.5 items-start justify-end">
			<div>
				<div className="bg-purple rounded-lg p-3">
					<p className="text-white text-start text-sm md:text-base font-medium break-all">
						{chat?.user_message}
					</p>
				</div>
				{!chat?.isTemp && (
					<div className="flex justify-end">
						<p className="text-xs text-gray mt-1 font-medium break-all">
							{formatTimeAgo(chat?.created_at)}
						</p>
					</div>
				)}
			</div>
			<Image
				className="shrink-0 w-8 h-8 rounded-full"
				src="/assets/bot.png"
				alt="boat"
				height="32"
				width="32"
			/>
		</div>
	);
};

export default UserMessage;
