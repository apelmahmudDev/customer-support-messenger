import Image from "next/image";

const Conversation = () => {
	return (
		<div>
			{/* right conversation*/}
			<div className="mb-4 flex gap-2.5 items-start justify-end">
				<div>
					<div className="bg-purple rounded-lg p-3">
						<p className="text-white text-start text-sm md:text-base font-medium break-all">
							Who won the fifa world cup in 2006 and how?
						</p>
					</div>
					<div className="flex justify-end">
						<p className="text-xs text-gray mt-1 font-medium break-all">
							1 minute ago
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
			{/* left conversation*/}
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
							Who won the fifa world cup in 2006 and how?
						</p>
					</div>
					<div className="flex justify-start">
						<p className="text-xs text-gray mt-1 font-medium break-all">
							10 minute ago
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Conversation;
