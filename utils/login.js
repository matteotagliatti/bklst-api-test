import * as dotenv from "dotenv";
dotenv.config();
import supabase from "./config.js";

export default async function getUser() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    });
    const user_id = data.session.user.id;
    return user_id;
  } catch (error) {
    console.log(error);
  }
}
