import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import gameRoutes from "./routes/games";
import keys from "./config/keys";
import path from "path";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/games", gameRoutes);
app.use(express.static(__dirname + "/../public/"));
app.get(/.*/, (req, res) => res.sendFile(path.resolve("public/index.html")));

mongoose.connect(keys.dbURI, () => {
  console.log("connected to mongodb");
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
