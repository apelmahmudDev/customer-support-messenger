"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import formatTimeAgo from "@/lib/formatTime";
import { useGetChatHistoryQuery } from "@/store/api/chatHistoryApi";
import Loader from "./Loader";

// const msg = [
// 	{
// 		id: 31,
// 		user_name: "Agatha Williams",
// 		user_message: "generate a birthday caption for wife",
// 		bot_name: "Genie",
// 		bot_message: "Happy birthday to my beautiful wife!",
// 		tokens: 221,
// 		words: 166,
// 		characters: 254,
// 		created_at: "06-09-2023 10:40 AM",
// 	},
// 	{
// 		id: 33,
// 		user_name: "Agatha Williams",
// 		user_message: "generate a birthday caption for wife",
// 		bot_name: "Genie",
// 		bot_message: "Happy birthday to my beautiful wife!",
// 		tokens: 221,
// 		words: 166,
// 		characters: 254,
// 		created_at: "06-09-2023 10:40 AM",
// 	},
// ];

const Conversation = () => {
	const { conversationId } = useSelector((state) => state.chat);
	const { data, isFetching } = useGetChatHistoryQuery(
		{
			conversationId,
			page: 1,
		},
		{ skip: !conversationId }
	);
	return (
		<div>
			{data?.data?.map((chat) => (
				<div key={chat?.id}>
					{/* right conversation*/}
					{chat?.user_message && (
						<div className="mb-4 flex gap-2.5 items-start justify-end">
							<div>
								<div className="bg-purple rounded-lg p-3">
									<p className="text-white text-start text-sm md:text-base font-medium break-all">
										{chat?.user_message}
									</p>
								</div>
								<div className="flex justify-end">
									<p className="text-xs text-gray mt-1 font-medium break-all">
										{formatTimeAgo(chat?.created_at)}
									</p>
								</div>
							</div>
							<Image
								className="shrink-0 w-8 h-8 rounded-full"
								src="/assets/bot.png"
								alt="boat"
								height="32"
								width="32"
							/>
						</div>
					)}
					{/* left conversation*/}
					{chat?.bot_message && (
						<div className="mb-4 flex gap-2.5 items-start justify-start">
							<div className="shrink-0 w-8 h-8 rounded-full bg-transparent overflow-hidden">
								<Image
									src="/assets/ai.png"
									alt="boat"
									height="32"
									width="32"
								/>
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
					)}
				</div>
			))}
			{true && (
				<div className="my-4 flex gap-2.5 items-start justify-start">
					<div className="shrink-0 w-8 h-8 rounded-full bg-transparent overflow-hidden">
						<Image
							src="/assets/ai.png"
							alt="boat"
							height="32"
							width="32"
						/>
					</div>
					<Loader />
				</div>
			)}
		</div>
	);
};

export default Conversation;
