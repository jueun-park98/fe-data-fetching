import express from "express";
import path from "path";
import newsRouter from './routes/news.js';
import searchRouter from './routes/search.js';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port: number = 3000;

app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "src")));

app.use("/news", newsRouter);
app.use("/search", searchRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
