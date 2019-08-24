import axios from "axios";

export default {
  getCoinMarketData
};

async function getCoinMarketData(symbol, local = "USD") {
  return await axios.get(
    `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=${local}&limit=10`
  );
}

async function getCoinImage(symbol) {
  return await axios.get(
    `https://cryptoicons.org/api/color/${symbol.toLowerCase()}/80`
  );
}
