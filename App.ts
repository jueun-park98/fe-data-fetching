import express from "express";
import path from "path";
import { indexRouter } from "./routes/index";
import { usersRouter } from "./routes/users";

const app = express();
const port: number = 3000;

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});