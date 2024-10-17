import express from "express";
import {
  fetchBooks,
  fetchBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.js";

const router = express.Router();


router.get("/", fetchBooks);
router.get("/:id", fetchBook); 
router.post("/", createBook); 
router.patch("/:id", updateBook); 
router.delete("/:id", deleteBook); 

export default router;
