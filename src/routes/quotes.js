import express from "express";
import { getQuotes } from "../services/quotesService.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const currency = req.query.currency || "ARS";
  const quotes = await getQuotes(currency);
  res.json(quotes);
});

export default router;
