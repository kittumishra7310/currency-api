import { initDB } from "../db/db.js";

const CACHE_DURATION = 60000; // 60 seconds

// Mock sources from assignment
const sourcesARS = [
  "https://www.ambito.com/contenidos/dolar.html",
  "https://www.dolarhoy.com",
  "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB"
];

const sourcesBRL = [
  "https://wise.com/es/currency-converter/brl-to-usd-rate",
  "https://nubank.com.br/taxas-conversao/",
  "https://www.nomadglobal.com"
];

// Generate random quote values to simulate live updates
function randomQuotes(sources) {
  return sources.map(src => ({
    source: src,
    buy_price: (140 + Math.random() * 10).toFixed(2),
    sell_price: (145 + Math.random() * 10).toFixed(2)
  }));
}

// Main function to get quotes
export async function getQuotes(currency = "ARS") {
  const db = await initDB();
  const now = Date.now();

  // Check cache
  const recent = await db.all(
    "SELECT * FROM quotes WHERE currency = ? AND ? - timestamp < ?",
    [currency, now, CACHE_DURATION]
  );

  if (recent.length > 0) {
    await db.close();
    return recent.map(r => ({
      source: r.source,
      buy_price: r.buy_price,
      sell_price: r.sell_price
    }));
  }

  // Generate or fetch new quotes
  const data = currency === "ARS" ? randomQuotes(sourcesARS) : randomQuotes(sourcesBRL);

  // Update DB
  await db.run("DELETE FROM quotes WHERE currency = ?", [currency]);
  for (const q of data) {
    await db.run(
      "INSERT INTO quotes (currency, source, buy_price, sell_price, timestamp) VALUES (?,?,?,?,?)",
      [currency, q.source, q.buy_price, q.sell_price, now]
    );
  }

  await db.close();
  return data;
}
