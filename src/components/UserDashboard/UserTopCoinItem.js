import React from "react";
import Template from "../../hoc/Template";
import { Link } from "react-router-dom";


const userTopCoinItem = props => (
  <Template>
    <Link className="top-coin" to={`prices/${props.coin.CoinInfo.Internal}`}>
      <div className="round-image">
        <img
          src={`https://www.cryptocompare.com${props.coin.CoinInfo.ImageUrl}`}
          alt=""
        />
      </div>
      <div>{props.coin.CoinInfo.FullName}</div>
      <div>{props.coin.CoinInfo.Internal}</div>
      <div>{props.coin.DISPLAY.USD.PRICE}</div>
    </Link>
  </Template>
);



export default userTopCoinItem;
