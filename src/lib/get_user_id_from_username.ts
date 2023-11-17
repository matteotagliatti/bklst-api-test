import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase.js";

export default async function (
  supabase: SupabaseClient<Database>,
  username: string
) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (error) throw error;

    return data.id;
  } catch (error) {
    console.log(error);
  }
}
