"use client";
import React, { useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
	// State to track the current page
	const [page, setPage] = useState(1);

	// State to store the list of items to be displayed
	const [items, setItems] = useState([]);

	// Ref to observe the sentinel element at the top
	const topSentinelRef = useRef(null);

	useEffect(() => {
		// Function to fetch data and update the state
		const fetchData = async () => {
			// const response = await fetch(
			// 	`https://your-api.com/data?page=${page}`
			// );
			// const newData = await response.json();
			const newData = Array.from(
				{ length: 40 },
				(_, i) => `Item ${i + 1}`
			);
			setItems((prevItems) => [...prevItems, ...newData]);
			setPage((prevPage) => prevPage + 1);
		};
		// Create an IntersectionObserver for the bottom sentinel
		const observer = new IntersectionObserver((entries) => {
			const sentinel = entries[0];
			if (sentinel.isIntersecting) {
				fetchData();
			}
		});

		// Create an IntersectionObserver for the top sentinel
		const topObserver = new IntersectionObserver((entries) => {
			const topSentinel = entries[0];
			if (topSentinel.isIntersecting) {
				fetchData(); // Load more data when top sentinel is in view
				topSentinelRef.current.style.height = "0px"; // Hide the top sentinel
			}
		});

		// Start observing the top sentinel element
		if (topSentinelRef.current) {
			topObserver.observe(topSentinelRef.current);
		}

		// Clean up the observers when the component unmounts
		return () => {
			if (topSentinelRef.current) {
				topObserver.unobserve(topSentinelRef.current);
			}
		};
	}, [page]);

	return (
		<div className="overflow-y-auto flex flex-col-reverse">
			{items.map((item, index) => (
				<div key={index}>{item}</div>
			))}
			<div ref={topSentinelRef} style={{ height: "0px" }}></div>
		</div>
	);
};

export default InfiniteScroll;
