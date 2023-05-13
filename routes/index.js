import express from "express";
const router = express.Router();
import supabase from "../utils/config.js";
import getUser from "../utils/login.js";

router.get("/", async function (req, res, next) {
  try {
    const user_id = await getUser();
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
