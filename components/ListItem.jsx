"use client";
import { useState } from "react";
import EditIcon from "./EditIcon";
import CloseIcon from "./CloseIcon";
import CheckIcon from "./CheckIcon";
import TrashIcon from "./TrashIcon";
import MessageIcon from "./MessageIcon";
import { useUpdateChatMutation } from "@/store/api/chatUpdateApi";

const ListItem = ({ id, title }) => {
	const [enableEdit, setEnableEdit] = useState(false);
	const [value, setValue] = useState(title);
	const [updateChat] = useUpdateChatMutation();

	const handleUpdateChat = async () => {
		const data = {
			chatId: id,
			name: value,
		};

		await updateChat(data);
		setEnableEdit(false);
	};

	const handleEnterKeyPress = async (e) => {
		if (value.length && e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();

			const data = {
				chatId: id,
				name: value,
			};

			await updateChat(data);
			setEnableEdit(false);
		}
	};

	return (
		<li
			className={`relative group/item flex items-center gap-1 text-white break-all overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-sm md:text-base cursor-pointer px-2 py-3 ${
				false
					? "bg-lighter-gray hover:bg-lighter-gray"
					: "bg-transparent hover:bg-lighter-gray"
			}`}
		>
			<div className="flex items-center gap-2">
				<MessageIcon />
				{enableEdit ? (
					<input
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={(e) => handleEnterKeyPress(e)}
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
				className={`absolute z-40 top-0 right-0 invisible group-hover/item:visible flex gap-0.5 justify-end h-full ${
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
						<button>
							<TrashIcon />
						</button>
					</>
				)}
			</div>

			<div className="absolute z-20 top-0 right-0 flex gap-0.5 justify-end h-full w-10 bg-gradient-to-l from-dark-secondary from-10%"></div>
		</li>
	);
};

export default ListItem;
