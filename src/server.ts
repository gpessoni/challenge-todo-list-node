import express, { Request, Response } from "express";
import tagRoutes from "./routes/tag.routes";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/tags", tagRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
