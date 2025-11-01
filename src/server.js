import app from "./app.js";
import dotenv from "dotenv";
import { createTable } from "./db/db.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

(async () => {
  await createTable();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();
