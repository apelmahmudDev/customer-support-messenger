import Image from "next/image";
export const BotTyping = () => {
	return (
		<div className="my-4 flex gap-2.5 items-start justify-start">
			<div className="shrink-0 w-8 h-8 rounded-full bg-transparent overflow-hidden">
				<Image src="/assets/ai.png" alt="boat" height="32" width="32" />
			</div>

			<div className="bg-off-white py-3 px-4 inline-block rounded-lg">
				<div className="bot-typing__wrap flex items-center h-[17px]">
					<div className="circle"></div>
					<div className="circle"></div>
					<div className="circle"></div>
				</div>
			</div>
		</div>
	);
};
