import express from "express";
import {
  addBook,
  getBooks,
  getMyBooks,
  deleteBook,
} from "../controllers/bookController.js";
import auth from "../middleware/auth.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const router = express.Router();

router.post("/", auth, upload.single("image"), addBook);
router.get("/", getBooks);
router.get("/my", auth, getMyBooks);
router.delete("/:id", auth, deleteBook);

export default router;
