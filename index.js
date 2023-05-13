import express from "express";
import indexRouter from "./routes/index.js";
const port = 3000;

const app = express();

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
