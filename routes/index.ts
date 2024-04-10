import express from "express";
import path from "path";
import fs from "fs";

const indexRouter = express.Router();

indexRouter.get("/", function(req, res, next) {
  const indexPath = path.join(__dirname, "src/index.html");
  const indexHTML = fs.readFileSync(indexPath, "utf-8");

  res.send(indexHTML);
});

export default indexRouter;