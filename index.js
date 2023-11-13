const express = require("express");
const dotenv = require("dotenv");
const port = 3000;

const { createClient } = require("./lib/supabase");

const app = express();

app.get("/books", async function (req, res, next) {
  const supabase = createClient({ req, res });

  const { data } = await supabase.from("books").select("*");
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
