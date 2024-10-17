import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);
mongoose
  .connect("mongodb://localhost:27017/book_store")
  .then(function () {
    console.log("connection success");
  })
  .catch(function (e) {
    console.log("not connected", e);
  });
  export default app;