"use client";
import { useState } from "react";
import EditIcon from "./EditIcon";
import CloseIcon from "./CloseIcon";
import CheckIcon from "./CheckIcon";
import TrashIcon from "./TrashIcon";
import MessageIcon from "./MessageIcon";
import { useUpdateChatMutation } from "@/store/api/chatApi";

const ListItem = ({
	id,
	title,
	handleSelectChatId,
	selectedId,
	handleDeleteChat,
}) => {
	const [enableEdit, setEnableEdit] = useState(false);
	const [value, setValue] = useState(title);
	const [updateChat] = useUpdateChatMutation();

	const handleUpdateChat = async () => {
		const data = {
			chatId: id,
			name: value,
		};

		setEnableEdit(false);
		await updateChat(data);
	};

	const handleUpdateChatByEnterKeyPress = async (e) => {
		if (value.length && e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();

			const data = {
				chatId: id,
				name: value,
			};

			setEnableEdit(false);
			await updateChat(data);
		}
	};

	return (
		<div
			onClick={() => handleSelectChatId(id)}
			className={`relative w-full group/item flex items-center gap-1 text-white break-all overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-sm md:text-base cursor-pointer px-2 py-3 ${
				selectedId === id
					? "bg-lighter-gray hover:bg-lighter-gray"
					: "bg-transparent hover:bg-lighter-gray"
			}`}
		>
			<div className="flex items-center gap-2">
				<MessageIcon />
				{enableEdit ? (
					<input
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={(e) => handleUpdateChatByEnterKeyPress(e)}
						type="text"
						name="item"
						autoFocus
						value={value}
						className={`focus:outline-0 focus:border focus:border-white/10 focus:rounded-sm w-[calc(100%-80px)] bg-transparent text-white text-sm md:text-base break-all`}
					/>
				) : (
					<span>{value}</span>
				)}
			</div>
			<div
				className={`absolute z-40 top-0 right-0 ${
					selectedId === id ? "visible" : "invisible"
				} group-hover/item:visible flex gap-0.5 justify-end h-full ${
					false ? "w-16" : "w-20"
				} bg-gradient-to-l from-lighter-gray from-65%`}
			>
				{enableEdit ? (
					<>
						<button onClick={handleUpdateChat}>
							<CheckIcon />
						</button>
						<button onClick={() => setEnableEdit(false)}>
							<CloseIcon />
						</button>
					</>
				) : (
					<>
						<button onClick={() => setEnableEdit(true)}>
							<EditIcon />
						</button>
						<button onClick={() => handleDeleteChat(id)}>
							<TrashIcon />
						</button>
					</>
				)}
			</div>

			<div className="absolute z-20 top-0 right-0 flex gap-0.5 justify-end h-full w-10 bg-gradient-to-l from-dark-secondary from-10%"></div>
		</div>
	);
};

export default ListItem;
