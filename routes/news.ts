import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { delay, generateRandomNumber } from './utils.js';

const FIRST_INDEX = 0;
const DEFAULT_TITLES_LENGTH = 5;
const RANDOM_FACTOR = 0.5;
const MIN_DELAY = 2000;
const MAX_DELAY = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Article {
  title: string;
  content?: string;
}

const newsRouter = express.Router();

newsRouter.get("/", async (req, res) => {
  const newsFilePath = path.join(__dirname, "../data/news.json");
  const randomDelay = generateRandomNumber(MIN_DELAY, MAX_DELAY);

  await delay(randomDelay);

  fs.readFile(newsFilePath, "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading news file:", err);
      res.status(500).send("Server error");
      return;
    }

    try {
      const articles = JSON.parse(data).articles;
      const titles = articles
        .map((article: Article) => article.title)
        .sort(() => RANDOM_FACTOR - Math.random());

      res.set("Cache-Control", "public, max-age=30");
      res.json(titles.slice(FIRST_INDEX, DEFAULT_TITLES_LENGTH));
    } catch (parseError) {
      console.error("Error parsing news.json file:", parseError);
      res.status(500).send("Server error");
    }
  });
});


export default newsRouter;
