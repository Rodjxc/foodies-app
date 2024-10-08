import { createClient } from "@supabase/supabase-js";
import slugify from "slugify";
import xss from "xss";

// Supabase setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch all meals from the database
export async function getMeals() {
	await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate request delay for testing purposes

	// Destructure the response to get data and error
	const { data } = await supabase.from("meals").select("*");

	return data; // Return the fetched meals data
}

// Fetch a single meal by slug
export async function getMeal(slug) {
	const { data } = await supabase
		.from("meals")
		.select("*")
		.eq("slug", slug)
		.single();

	return data; // Return the single meal data
}

// Save a new meal input by the user in the database
export async function saveMeal(meal) {
	// Create a slug from the meal title
	meal.slug = slugify(meal.title, { lower: true });

	// Sanitize instructions to prevent XSS attacks
	meal.instructions = xss(meal.instructions);

	// Upload the image to Supabase storage
	const { data: imageUploadData, error: imageUploadError } =
		await supabase.storage
			.from("meal-images")
			.upload(`public/${meal.slug}`, meal.image);

	if (imageUploadError) {
		throw new Error("Image upload failed:", imageUploadError.message);
	}

	// Set the image URL for the meal
	meal.image = imageUploadData.publicUrl;

	// Insert the meal into the database
	const { data, error } = await supabase.from("meals").insert([meal]);

	if (error) {
		throw new Error("Error saving meal:", error.message);
	}

	return data; // Return the inserted meal data
}
