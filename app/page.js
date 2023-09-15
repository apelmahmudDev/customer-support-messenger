import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { BotTyping } from "@/components/BotTyping";
import Conversation from "@/components/Conversation";
import AutoExpandingTextarea from "@/components/AutoExpandingTextarea";

export default function Home() {
	return (
		<div className="h-screen">
			<nav className="w-full bg-dark-primary">
				<Header />
			</nav>
			<section className="relative h-[calc(100%-56px)] overflow-hidden">
				<aside>
					<Sidebar />
				</aside>
				<main className="h-full flex flex-col overflow-hidden sm:ml-64">
					<Conversation />
					<div className="p-4 mx-auto w-full max-w-screen-lg">
						<BotTyping />
						<AutoExpandingTextarea />
					</div>
				</main>
			</section>
		</div>
	);
}
