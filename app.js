import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.js";
import routerAuthor from "./routes/author.js";
import routerCategory from "./routes/category.js";
import routerAuth from "./routes/auth.js";
import routerEvent from "./routes/event.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/author", routerAuthor);
app.use("/api/categories", routerCategory);
app.use("/api/auth", routerAuth);
app.use("/api/event", routerEvent);
mongoose
  .connect("mongodb://localhost:27017/book_store")
  .then(function () {
    console.log("connection success");
  })
  .catch(function (e) {
    console.log("not connected", e);
  });
export default app;
