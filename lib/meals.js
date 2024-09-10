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

	const { data, error } = await supabase.from("Meals").select("*");

	console.log("Fetched meals data:", data);
	console.log("Meals fetch error:", error);

	if (error) {
		console.error("Error fetching meals:", error);
		return []; // Return an empty array on error
	}

	return data; // Return the fetched meals data
}

// Fetch a single meal by slug
export async function getMeal(slug) {
	const { data, error } = await supabase
		.from("Meals")
		.select("*")
		.eq("slug", slug)
		.single();

	if (error) {
		console.error("Error fetching meal:", error);
		return null; // Return null on error
	}

	console.log("Supabase URL in app:", process.env.NEXT_PUBLIC_SUPABASE_URL);
	console.log("Supabase Key in app:", process.env.NEXT_PUBLIC_SUPABASE_KEY);

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
	const { data, error } = await supabase.from("Meals").insert([meal]);

	if (error) {
		throw new Error("Error saving meal:", error.message);
	}

	return data; // Return the inserted meal data
}
