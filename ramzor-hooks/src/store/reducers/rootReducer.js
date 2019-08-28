import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import coin from "./coin/coin.reducer";
import user from "./user/user.reducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const combinedReducers = combineReducers({
  coin,
  user
});
const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
