import * as actionTypes from "./actionTypes";
import axios from "axios";

export const setBalance = newBalance => {
  return {
    type: actionTypes.SET_NEW_BALANCE,
    balance: newBalance.toFixed(2)
  };
};

export const setNewBalance = (oldBalance, amount) => {
  const newBalance = oldBalance - amount;
  return dispatch => {
    dispatch(setBalance(newBalance));
  };
};

export const convertSuccess = balance => {
  return {
    type: actionTypes.CONVERT_SUCCESS,
    balance: balance
  };
};

export const setTopCoins = coins => {
  return {
    type: actionTypes.SET_COINS,
    coins: coins.Data
  };
};

const setBitcoinPrice = btcPrice => {
  return {
    type: actionTypes.SET_BTC_PRICE,
    btcPrice: btcPrice
  };
};

export const setBitcoinRatio = btcPrice => {
  return dispatch => {
    dispatch(setBitcoinPrice(btcPrice));
  };
};

export const usdToBtc = amount => {
  const convertURL = `https://blockchain.info/tobtc?currency=USD&value=${amount}`;
  return async dispatch => {
    try {
      const balance = await axios.post(convertURL);
      dispatch(convertSuccess(balance.data));
    } catch (error) {}
  };
};

export const getTopCoins = limit => {
  const cryptocompare = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${limit}&tsym=USD`;
  return async dispatch => {
    try {
      const coins = await axios.get(cryptocompare);
      dispatch(setTopCoins(coins.data));
      return coins.data;
    } catch (error) {}
  };
};
