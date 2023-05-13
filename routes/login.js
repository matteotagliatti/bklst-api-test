import express from "express";
const router = express.Router();
import supabase from "../config.js";

router.get("/", async function (req, res, next) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "matteotagliatti@gmail.com",
      password: "Bradipo1994",
    });
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
