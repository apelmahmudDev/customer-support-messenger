"use client";
import { useSelector } from "react-redux";

export const BotTyping = () => {
	const { isBotTyping } = useSelector((state) => state.ui);
	if (isBotTyping)
		return (
			<div className="my-2">
				<div className="py-3 px-4 inline-block rounded-lg">
					<div className="bot-typing__wrap flex items-center h-[17px]">
						<div className="circle"></div>
						<div className="circle"></div>
						<div className="circle"></div>
					</div>
				</div>
			</div>
		);
};
