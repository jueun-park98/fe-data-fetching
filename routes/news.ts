import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const FIRST_INDEX = 0;
const DEFAULT_TITLES_LENGTH = 5;
const RANDOM_FACTOR = 0.5;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Article {
  title: string;
  content?: string;
}

const newsRouter = express.Router();

newsRouter.get("/", (req, res, next) => {
  const newsFilePath = path.join(__dirname, "../data/news.json");

  fs.readFile(newsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading news file:", err);
      res.status(500).send("Server error");
      return;
    }

    try {
      const articles = JSON.parse(data).articles;
      const titles = articles
        .map((article: Article) => article.title)
        .sort((a: Article, b: Article) => RANDOM_FACTOR - Math.random());

      res.json(titles.slice(FIRST_INDEX, DEFAULT_TITLES_LENGTH));
    } catch (parseError) {
      console.error("Error parsing news.json file:", parseError);
      res.status(500).send("Server error");
    }
  });
});

export default newsRouter;
