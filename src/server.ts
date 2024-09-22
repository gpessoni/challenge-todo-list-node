import express, { Request, Response } from "express";
import tagRoutes from "./routes/tag.routes";
import taskRoutes from "./routes/task.routes";
import commentRoutes from "./routes/comment.routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/tags", tagRoutes);
app.use("/tasks", taskRoutes);
app.use("/comments", commentRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
