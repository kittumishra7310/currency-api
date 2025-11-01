// src/services/quotesService.js

const CACHE_DURATION = 60000; // 60 seconds
const cache = {}; // simple in-memory cache

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

function randomQuotes(sources) {
  return sources.map(src => ({
    source: src,
    buy_price: (140 + Math.random() * 10).toFixed(2),
    sell_price: (145 + Math.random() * 10).toFixed(2)
  }));
}

export async function getQuotes(currency = "ARS") {
  const now = Date.now();

  // Simple cache
  if (cache[currency] && now - cache[currency].timestamp < CACHE_DURATION) {
    return cache[currency].data;
  }

  const data = currency === "ARS" ? randomQuotes(sourcesARS) : randomQuotes(sourcesBRL);
  cache[currency] = { data, timestamp: now };

  return data;
}
