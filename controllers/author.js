import Author from "../models/Author.js";
export const createAuthor = async (req, res) => {
  try {
    console.log("body:", req.body);
    const author = new Author(req.body);
    await author.save();
    res.status(201).json({ model: author, message: "success" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "donnés invalides",
    });
  }
};
