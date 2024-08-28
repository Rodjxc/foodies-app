import sql from "better-sqlite3";

const db = sql("meals.db");

// We can configure whole "components" in NextJS to work like an async function (in React you cant). In this case
// and for this example, we'll also add a setTimeout to simulate the time the request takes to get the response

export async function getMeals() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return db.prepare("SELECT * FROM meals").all();
}
