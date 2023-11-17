export default async function (supabase, username) {
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
