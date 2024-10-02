import express from "express";
import { generateReport } from "../controller/reportController.js";

const router = express.Router();

// Route to generate report
router.post("/generate", generateReport);

export default router;
