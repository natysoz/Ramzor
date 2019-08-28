import axios from "axios";

export default {
  getCoinMarketData,
  getBtcPrice
};

async function getCoinMarketData(symbol, local = "USD") {
  return await axios.get(
    `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=${local}&limit=10`
  );
}

async function getBtcPrice() {
  return await axios.get("https://blockchain.info/ticker");
}
