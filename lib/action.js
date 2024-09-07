"use server";

import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

//Normally, we'd gather the info of the form and send it to an API/backend. But in this case, NextJS has also a backend, so
//we can leverage that and use a "use server" action, and we attach that to the <form>. That way, it works only on the server. If

function isInvalidText(text) {
	return !text || text.trim() === "";
}

export async function shareMeal(formData) {
	const meal = {
		title: formData.get("title"),
		summary: formData.get("summary"),
		instructions: formData.get("instructions"),
		image: formData.get("image"),
		creator: formData.get("name"),
		creator_email: formData.get("email"),
	};

	if (
		isInvalidText(meal.title) ||
		isInvalidText(meal.summary) ||
		isInvalidText(meal.instructions) ||
		isInvalidText(meal.creator) ||
		isInvalidText(meal.creator_email) ||
		!meal.creator_email.includes("@") ||
		!meal.image ||
		meal.image.size === 0
	) {
		throw new Error("Invalid or missing input");
	}

	await saveMeal(meal);
	redirect("/meals");
}
