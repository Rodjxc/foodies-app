"use server";

import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

//Normally, we'd gather the info of the form and send it to an API/backend. But in this case, NextJS has also a backend, so
//we can leverage that and use a "use server" action, and we attach that to the <form>. That way, it works only on the server. If

function isInvalidText(text) {
	return !text || text.trim() === "";
}

// we added to pass the prevState too, to be able to retain data from the user in case of error when submitting
export async function shareMeal(prevState, formData) {
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
		return {
			message: "Invalid input or missing field",
		};
	}

	await saveMeal(meal);
	//we added this revalidatePath() after deploying the app in prod, for it to re-fetch the data after a new meal is
	//submitted. Otherwise the "agressive caching" from NextJS won't update new meals. This will update the defined route.
	// we could add ("/","layout") to revalidate all the routes of the application but for this one, only meals is fine
	revalidatePath("/meals");
	redirect("/meals");
}
