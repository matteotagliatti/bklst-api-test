import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

const port = 3000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.get("/read", async function (req, res) {
  const { data, error } = await supabase
    .from("books")
    .select()
    .eq("owner", "3c43aa5c-66ee-4c7d-9731-1c5431a16283")
    .eq("status", "read")
    .order("updated_at", { ascending: false })
    .limit(10);

  if (error) throw error;

  res.send(data);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
