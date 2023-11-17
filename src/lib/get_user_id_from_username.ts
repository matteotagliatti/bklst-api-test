import type { SupabaseClient } from "@supabase/supabase-js";

export default async function (supabase: SupabaseClient, username: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (error) throw error;

    return data.id as string;
  } catch (error) {
    console.log(error);
  }
}
