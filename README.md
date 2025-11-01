# 💱 Currency Exchange API

A backend project built with **Node.js + Express + SQLite**, developed as part of the **Think41 Boot41 Backend Assignment**.  
This API provides live-like USD currency quotes (ARS/BRL), computes averages, and calculates slippage percentages between sources.  
It also includes caching logic to ensure data freshness (≤60 seconds).

---

## 🚀 Features

✅ Three functional endpoints  
✅ SQL-based caching using SQLite  
✅ Auto-refresh every 60 seconds  
✅ RESTful JSON responses  
✅ Ready for deployment (Render / Railway)  

---

## 🏗️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Runtime | Node.js (ES Modules) |
| Framework | Express.js |
| Database | SQLite |
| HTTP Client | Axios |
| CORS & Environment | cors, dotenv |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/kittumishra7310/currency-api.git
cd currency-api

