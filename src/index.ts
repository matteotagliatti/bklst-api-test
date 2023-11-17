import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import express from "express";
import get_user_id_from_username from "./lib/get_user_id_from_username.js";
dotenv.config();

const app = express();

const port = 3000;

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

app.get("/:username/", async function (req, res) {
  const user_id = await get_user_id_from_username(
    supabase,
    req.params.username
  );

  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("owner", user_id)
    .order("updated_at", { ascending: false })
    .limit(25);

  if (error) throw error;

  res.send(data);
});

app.get("/:username/reading", async function (req, res) {
  const user_id = await get_user_id_from_username(
    supabase,
    req.params.username
  );

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

app.get("/:username/read", async function (req, res) {
  const user_id = await get_user_id_from_username(
    supabase,
    req.params.username
  );

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

app.get("/:username/to-read", async function (req, res) {
  const user_id = await get_user_id_from_username(
    supabase,
    req.params.username
  );

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
