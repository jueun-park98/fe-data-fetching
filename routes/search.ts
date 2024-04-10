import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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

  fs.readFile(newsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading news.json file:", err);
      res.status(500).send("Server error");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const matchingArticles = jsonData.articles.find(
        (article: Article) => article.title === (news_title as string)
      );
      
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
});

export default searchRouter;