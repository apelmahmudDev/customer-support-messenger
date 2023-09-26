"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "@/store/slices/uiSlice";
import { useSession } from "next-auth/react";

const Header = () => {
	const { data: session } = useSession();
	const dispatch = useDispatch();
	const { openSidebar } = useSelector((state) => state.ui);

	const handleSidebar = () => {
		dispatch(setOpenSidebar());
	};

	return (
		<div className="px-3 py-3 lg:px-5 lg:pl-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-start">
					<button
						onClick={handleSidebar}
						data-drawer-target="logo-sidebar"
						data-drawer-toggle="logo-sidebar"
						aria-controls="logo-sidebar"
						type="button"
						className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray"
					>
						<span className="sr-only">Open sidebar</span>
						{!openSidebar ? (
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								fill="#fff"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clipRule="evenodd"
									fillRule="evenodd"
									d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
								></path>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
								stroke="white"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						)}
					</button>
					<p className="flex ml-2 md:mr-24 text-white break-all">
						Chat
					</p>
				</div>
				<div className="flex items-center">
					<div className="flex items-center ml-3">
						<div>
							<button
								type="button"
								className="flex text-sm bg-gray-800 rounded-full"
								aria-expanded="false"
								data-dropdown-toggle="dropdown-user"
							>
								<span className="sr-only">Open user menu</span>
								<Image
									height="32"
									width="32"
									className="w-8 h-8 rounded-full"
									src={session?.user?.image}
									alt="user photo"
								/>
							</button>
						</div>
						<div
							className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
							id="dropdown-user"
						>
							<div className="px-4 py-3" role="none">
								<p
									className="text-sm text-gray-900"
									role="none"
								>
									Neil Sims
								</p>
								<p
									className="text-sm font-medium text-gray-900 truncate"
									role="none"
								>
									neil.sims@flowbite.com
								</p>
							</div>
							<ul className="py-1" role="none">
								<li>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										role="menuitem"
									>
										Settings
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										role="menuitem"
									>
										Sign out
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
