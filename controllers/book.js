import Book from "../models/Book.js";

// Récupérer tous les livres
export const fetchBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ model: books, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un livre par son ID
export const fetchBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ model: book, message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau livre
export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ model: book, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un livre 
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ model: book, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un livre
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
