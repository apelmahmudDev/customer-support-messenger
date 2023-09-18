const Dialog = ({ handleCancel, setIsDelete }) => {
	return (
		<div className="dialog-overlay flex flex-col items-center justify-center sm:pl-64">
			<div className="p-4">
				<div className="dialog max-w-lg bg-white rounded-xl shadow-lg">
					<div className="dialog-body p-4">
						<h3 className="py-3 text-sm md:text-base break-all">
							Are you sure you want to delete this chat?
						</h3>
						<div className="mt-4 flex gap-4">
							<button
								onClick={handleCancel}
								className="bg-white hover:bg-[#1352900a] active:bg-white w-full text-sm  break-all border border-lighter-gray rounded-md p-2"
							>
								Cancel
							</button>

							<button
								onClick={() => setIsDelete(true)}
								className="bg-purple hover:bg-purple/90 active:bg-purple text-white w-full text-sm  break-all border border-lighter-gray rounded-md p-2"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dialog;
