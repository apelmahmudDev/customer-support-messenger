"use client";
import { useSelector } from "react-redux";

export const BotTyping = () => {
	const { isBotTyping } = useSelector((state) => state.ui);
	if (isBotTyping) return <div className="my-2">Typing...</div>;
};
