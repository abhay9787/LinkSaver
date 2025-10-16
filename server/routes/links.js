import express from "express";
import { getLinks, addLink, updateLink, deleteLink } from "../controllers/linkController.js";
import  {protect}  from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getLinks);
router.post("/", protect, addLink);
router.put("/:id", protect, updateLink);
router.delete("/:id", protect, deleteLink);

export default router;
