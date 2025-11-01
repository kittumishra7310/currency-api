import express from "express";
import cors from "cors";
import quotesRouter from "./routes/quotes.js";
import averageRouter from "./routes/average.js";
import slippageRouter from "./routes/slippage.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/quotes", quotesRouter);
app.use("/average", averageRouter);
app.use("/slippage", slippageRouter);

export default app;
