import formatTimeAgo from "@/lib/formatTime";
import Image from "next/image";

const BotMessage = ({ chat }) => {
	return (
		<div className="mb-4 flex gap-2.5 items-start justify-start">
			<div className="shrink-0 w-8 h-8 rounded-full bg-transparent overflow-hidden">
				<Image src="/assets/ai.png" alt="boat" height="32" width="32" />
			</div>
			<div>
				<div className="bg-off-white rounded-lg p-3">
					<p className="text-[#141414] text-start text-sm md:text-base font-medium break-all">
						{chat?.bot_message}
					</p>
				</div>
				<div className="flex justify-start">
					<p className="text-xs text-gray mt-1 font-medium break-all">
						{formatTimeAgo(chat?.created_at)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default BotMessage;
