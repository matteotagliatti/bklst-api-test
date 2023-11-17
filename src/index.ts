import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import express from "express";
import get_user_id_from_username from "./lib/get_user_id_from_username.js";
import { Database } from "./types/supabase.js";
dotenv.config();

const app = express();

const port = 3000;
const router = express.Router();

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

/**
 * Middleware to check if the user exists
 */
app.use(
  "/:username",
  async function (req, res, next) {
    const user_id = await get_user_id_from_username(
      supabase,
      req.params.username
    );

    if (!user_id) throw new Error("User not found");

    res.locals.user_id = user_id;

    next();
  },
  router
);

/**
 * User Routes
 */
router.get("/", async function (req, res) {
  const user_id = res.locals.user_id as string;

  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("owner", user_id)
    .order("updated_at", { ascending: false })
    .limit(25);

  if (error) throw error;

  res.send(data);
});

router.get("/reading", async function (req, res) {
  const user_id = res.locals.user_id as string;

  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("owner", user_id)
    .eq("status", "reading")
    .order("updated_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  res.send(data);
});

router.get("/read", async function (req, res) {
  const user_id = res.locals.user_id as string;

  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("owner", user_id)
    .eq("status", "read")
    .order("finished", { ascending: false })
    .limit(15);

  if (error) throw error;

  res.send(data);
});

router.get("/to-read", async function (req, res) {
  const user_id = res.locals.user_id as string;

  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("owner", user_id)
    .eq("status", "to-read")
    .order("updated_at", { ascending: false })
    .limit(15);

  if (error) throw error;

  res.send(data);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
