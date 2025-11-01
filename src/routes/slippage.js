import express from "express";
import { getQuotes } from "../services/quotesService.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const currency = req.query.currency || "ARS";
  const quotes = await getQuotes(currency);

  const avgBuy = quotes.reduce((s, q) => s + parseFloat(q.buy_price), 0) / quotes.length;
  const avgSell = quotes.reduce((s, q) => s + parseFloat(q.sell_price), 0) / quotes.length;

  const slippage = quotes.map(q => ({
    source: q.source,
    buy_price_slippage: (((q.buy_price - avgBuy) / avgBuy) * 100).toFixed(2),
    sell_price_slippage: (((q.sell_price - avgSell) / avgSell) * 100).toFixed(2)
  }));

  res.json(slippage);
});

export default router;
