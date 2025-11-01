import express from "express";
import { getQuotes } from "../services/quotesService.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const currency = req.query.currency || "ARS";
  const quotes = await getQuotes(currency);

  const avgBuy = quotes.reduce((s, q) => s + parseFloat(q.buy_price), 0) / quotes.length;
  const avgSell = quotes.reduce((s, q) => s + parseFloat(q.sell_price), 0) / quotes.length;

  res.json({
    average_buy_price: avgBuy.toFixed(2),
    average_sell_price: avgSell.toFixed(2)
  });
});

export default router;
