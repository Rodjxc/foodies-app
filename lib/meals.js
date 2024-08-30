//in this file we configure the files to be able for the server components to have access to the database

import sql from "better-sqlite3";

// we establish the connection by importing the database we'll use, and use it to access the name of the database

const db = sql("meals.db");

// We can configure whole "components" in NextJS to work like an async function (in React you cant). In this case
// and for this example, we'll also add a setTimeout to simulate the time the request takes to get the response.
//Now, when we'll call getMeals, it'll do an async call to fetch the meals from the database

export async function getMeals() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return db.prepare("SELECT * FROM meals").all();
}
