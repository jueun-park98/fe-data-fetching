import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const MIN_DELAY = 2000;
const MAX_DELAY = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Article {
  title: string;
  content?: string;
}

const searchRouter = express.Router();

searchRouter.get("/", (req, res) => {
  const { news_title } = req.query;

  if (!news_title) {
    res.status(400).send("news_title query is required");
    return;
  }

  const newsFilePath = path.join(__dirname, "../data/news.json");

  setTimeout(() => {
    fs.readFile(newsFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading news.json file:", err);
        res.status(500).send("Server error");
        return;
      }

      try {
        const articles = JSON.parse(data).articles;
        const matchingArticles = articles.find((article: Article) => article.title === (news_title as string));

        if (!matchingArticles) {
          res.status(404).send("No articles found matching the title");
          return;
        }

        res.json(matchingArticles);
      } catch (parseError) {
        console.error("Error parsing news.json file:", parseError);
        res.status(500).send("Server error");
      }
    });
  }, generateRandomNumber(MIN_DELAY, MAX_DELAY));
});

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default searchRouter;
