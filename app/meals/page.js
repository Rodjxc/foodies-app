import MealsGrid from "@/components/meals/meals-grid";
import classes from "./page.module.css";
import Link from "next/link";

export default function MealsPage() {
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
				<MealsGrid meals={[]} />
			</main>
		</>
	);
}
