const express = require("express");
const dotenv = require("dotenv");
const port = 3000;

dotenv.config();

const { createClient } = require("./lib/supabase");

const app = express();

app.get("/auth/confirm", async function (req, res) {
  const token_hash = req.query.token_hash;
  const type = req.query.type;
  const next = req.query.next ?? "/";

  if (token_hash && type) {
    const supabase = createClient({ req, res });
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      res.redirect(303, `/${next.slice(1)}`);
    }
  }

  throw new Error("Invalid token");
});

app.get("/auth/signin", async function (req, res) {
  const supabase = createClient({ req, res });

  console.log(supabase);

  const { error } = await supabase.auth.signInWithPassword({
    email: req.query.email,
  });

  if (error) {
    throw new Error(error.message);
  }

  res.redirect(303, `/auth/confirm?type=signin&next=${req.query.next}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
