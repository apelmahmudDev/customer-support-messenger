function formatTimeAgo(created_at) {
	const parts = created_at.split(/[- :]/);
	const formattedCreatedAt = `${parts[1]}-${parts[0]}-${parts[2]} ${parts[3]}:${parts[4]} ${parts[5]}`;
	const now = new Date();
	const createdAtDate = new Date(formattedCreatedAt);
	const timeDifference = now - createdAtDate;
	const seconds = Math.floor(timeDifference / 1000);

	if (seconds < 60) {
		return "Just now";
	} else if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
	} else if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return hours === 1 ? "1 hour ago" : hours + " hours ago";
	} else if (seconds < 604800) {
		const days = Math.floor(seconds / 86400);
		return days === 1 ? "1 day ago" : days + " days ago";
	} else {
		// Format the date in 'DD Mon YYYY' format
		const options = { year: "numeric", month: "short", day: "numeric" };
		return createdAtDate.toLocaleDateString(undefined, options);
	}
}
export default formatTimeAgo;
