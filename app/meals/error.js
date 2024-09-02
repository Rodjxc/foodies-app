"use client";

//The error component in Next will automatically pass a chil called error, but the message will be hidden for safety reasons

export default function Error({ error }) {
	return (
		<main className="error">
			<h1>An error occurred</h1>
			<p>Failed to fetch meal data. Please try again later</p>
		</main>
	);
}
