import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});


bookSchema.pre("save", async function (next) {
  try {
    const Book = mongoose.model("Book");
    const authorBooks = await Book.find({ author: this.author });

    if (authorBooks.length === 0) {
      const error = new Error("Author must have written other books before.");
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
});
export default mongoose.model("Book", bookSchema);