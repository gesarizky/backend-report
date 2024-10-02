import express from "express";
import { upload, uploadImage } from "../controller/uploadController.js";

const router = express.Router();

// Route untuk upload gambar
router.post("/image", upload.single("image"), uploadImage);

export default router;
