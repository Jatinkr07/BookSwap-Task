import Request from "../models/Request.js";
import Book from "../models/Book.js";

export const createRequest = async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.user.toString() === req.user.id)
      return res.status(400).json({ message: "Cannot request your own book" });

    const existingRequest = await Request.findOne({
      book: bookId,
      requester: req.user.id,
      status: "pending",
    });
    if (existingRequest)
      return res
        .status(400)
        .json({ message: "You already have a pending request for this book" });

    const request = new Request({
      book: bookId,
      requester: req.user.id,
      owner: book.user,
    });
    await request.save();
    res.status(201).json({ message: "Request created successfully", request });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ requester: req.user.id })
      .populate("book", "title author condition image")
      .populate("owner", "username");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getReceivedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ owner: req.user.id })
      .populate("book", "title author condition image")
      .populate("requester", "username");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateRequest = async (req, res) => {
  const { status } = req.body;
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.owner.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request already processed" });
    }

    request.status = status;
    await request.save();

    if (status === "accepted") {
      await Request.updateMany(
        { book: request.book, _id: { $ne: request._id }, status: "pending" },
        { status: "declined" }
      );
    }

    res.json({ message: `Request ${status}`, request });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
