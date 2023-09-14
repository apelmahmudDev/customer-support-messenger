"use client";
import { useSelector } from "react-redux";

export const BotTyping = () => {
	const { isBotTyping } = useSelector((state) => state.ui);
	if (isBotTyping)
		return (
			<div className="my-2">
				<div class="py-3 px-4 inline-block rounded-lg">
					<div class="bot-typing__wrap flex items-center h-[17px]">
						<div class="circle"></div>
						<div class="circle"></div>
						<div class="circle"></div>
					</div>
				</div>
			</div>
		);
};
