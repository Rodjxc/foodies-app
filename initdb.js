import { config } from "dotenv";
config({ path: ".env.local" });

import { dummyMeals } from "./startingDbTypes.js";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function initData() {
	for (const meal of dummyMeals) {
		const data = await supabase.from("Meals").insert([meal]);
	}
}

initData();
