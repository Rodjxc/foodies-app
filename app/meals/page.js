import MealsGrid from "@/components/meals/meals-grid";
import classes from "./page.module.css";
import Link from "next/link";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

async function Meals() {
	const meals = await getMeals();

	return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
	// This below will call (on load) the getMeals, that will call the database and get the info. We do that instead of
	// a useEffect or anything, since NextJS also has a backend

	return (
		<>
			<header className={classes.header}>
				<h1>
					Delicious meals, created by{" "}
					<span className={classes.highlight}>you</span>
				</h1>
				<p>
					Choose your favourite recipe and cook it yourself. It is easy and fun!
				</p>
				<p className={classes.cta}>
					<Link href="/meals/share">Share your favourite recipe</Link>
				</p>
			</header>
			<main className={classes.header}>
				<Suspense fallback={<p className={classes.loading}>Fetching Meals</p>}>
					<Meals />
				</Suspense>
			</main>
		</>
	);
}
