import objectUpdate from "../../helpers/objectUpdater";
import * as actionTypes from "../../actions/actionTypes";

const coinStore = {
  btc: 0,
  btcPrice: 0,
  coins: null
};

function reducer(state = coinStore, action) {
  switch (action.type) {
    case actionTypes.SET_BTC_PRICE:
      return objectUpdate(state, { btcPrice: action.btcPrice });
    case actionTypes.CONVERT_SUCCESS:
      return objectUpdate(state, { btc: action.balance });
    case actionTypes.SET_COINS:
      return objectUpdate(state, { coins: action.coins });
    default:
      return state;
  }
}

export default reducer;
