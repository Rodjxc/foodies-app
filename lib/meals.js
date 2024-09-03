//in this file we configure the files to be able for the server components to have access to the database

//this will allow us to work with node's file system
import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

// we establish the connection by importing the database we'll use, and use it to access the name of the database

const db = sql("meals.db");

// We can configure whole "components" in NextJS to work like an async function (in React you cant).
//Now, when we'll call getMeals, it'll do an async call to fetch the meals from the database

//This function will get the all meals from the database

export async function getMeals() {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	// In this case and for this example, we'll also add a setTimeout to simulate the time the request takes to get the response.
	return db.prepare("SELECT * FROM meals").all();
}

//This function will get the meal that matches the slug

export function getMeal(slug) {
	return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

//This function will save a new meal input by the user in the database

export async function saveMeal(meal) {
	//to save a new function, we need to create first the slug (since they're dynamic). To do that, we use the library slugify, and we lowercase it
	meal.slug = slugify(meal.title, { lower: true });
	//to prevent xss attacks we sanitize the input text we get with the xss library
	meal.instructions = xss(meal.instructions);
	//then, to save the image. It won't be stored in the database because of performance. First we need to get it's extension (jpg,png..)
	const extension = meal.image.name.split(".").pop();
	const fileName = `${meal.slug}.${extension}`;

	const stream = fs.createWriteStream(`public/images/${fileName}`);
	const bufferedImage = await meal.image.arrayBuffer();

	stream.write(Buffer.from(bufferedImage), (error) => {
		if (error) {
			throw new Error("Saving image failed!");
		}
	});

	meal.image = `/images/${fileName}`;

	db.prepare(`
		INSERT INTO Meals
		(title,summary,instructions,creator, creator_email, image, slug)
		VALUES (
		@title,
		@summary,
		@instructions,
		@creator,
		@creator_email,
		@image,
		@slug
		)
		`).run(meal);
}
