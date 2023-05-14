import supabase from "./config.js";

export default async function getUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    const user_id = data.session.user.id;
    return user_id;
  } catch (error) {
    console.log(error);
  }
}
