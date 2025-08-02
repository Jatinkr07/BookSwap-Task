import express from "express";
import {
  createRequest,
  getMyRequests,
  getReceivedRequests,
  updateRequest,
} from "../controllers/requestController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createRequest);
router.get("/my", auth, getMyRequests);
router.get("/received", auth, getReceivedRequests);
router.put("/:id", auth, updateRequest);

export default router;
