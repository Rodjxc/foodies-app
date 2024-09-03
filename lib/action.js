"use server";

import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

//Normally, we'd gather the info of the form and send it to an API/backend. But in this case, NextJS has also a backend, so
//we can leverage that and use a "use server" action, and we attach that to the <form>. That way, it works only on the server. If
//we console log it, it'll appear on the terminal console instead of in the console in the browser

export async function shareMeal(formData) {
	const meal = {
		title: formData.get("title"),
		summary: formData.get("summary"),
		instructions: formData.get("instructions"),
		image: formData.get("image"),
		creator: formData.get("name"),
		creator_email: formData.get("email"),
	};

	await saveMeal(meal);
	redirect("/meals");
}
