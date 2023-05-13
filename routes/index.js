import express from "express";
const router = express.Router();
import supabase from "../config.js";

import * as dotenv from "dotenv";
dotenv.config();

router.get("/", async function (req, res, next) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    });
    const user_id = data.session.user.id;

    const { data: books, error2 } = await supabase
      .from("books")
      .select()
      .eq("owner", user_id);

    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;