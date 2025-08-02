import Book from "../models/Book.js";
import path from "path";
import fs from "fs";

export const addBook = async (req, res) => {
  const { title, author, condition } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";
  try {
    const book = new Book({
      title,
      author,
      condition,
      image,
      user: req.user.id,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("user", "username");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const imagePath = path.join(
      process.cwd(),
      "uploads",
      path.basename(book.image)
    );
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await book.deleteOne();
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
