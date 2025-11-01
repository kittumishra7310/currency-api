import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quotesRouter from "./routes/quotes.js";
import averageRouter from "./routes/average.js";
import slippageRouter from "./routes/slippage.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/quotes", quotesRouter);
app.use("/average", averageRouter);
app.use("/slippage", slippageRouter);

// ✅ Health route for testing
app.get("/", (req, res) => {
  res.send("Currency API is running 🚀");
});

// ✅ For local testing
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on port ${PORT}`);
  });
}

// ✅ For Vercel (serverless export)
export default app;
