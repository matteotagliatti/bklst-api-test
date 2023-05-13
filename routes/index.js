import express from "express";
const router = express.Router();
import supabase from "../utils/config.js";
import getUser from "../utils/login.js";

router.get("/", async function (req, res, next) {
  try {
    const user_id = await getUser();
    const { data: books, error } = await supabase
      .from("books")
      .select()
      .eq("owner", user_id);

    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/read", async function (req, res, next) {
  try {
    const user_id = await getUser();
    const { data: books, error } = await supabase
      .from("books")
      .select()
      .eq("owner", user_id)
      .eq("status", "read");

    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/reading", async function (req, res, next) {
  try {
    const user_id = await getUser();
    const { data: books, error } = await supabase
      .from("books")
      .select()
      .eq("owner", user_id)
      .eq("status", "reading");

    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
