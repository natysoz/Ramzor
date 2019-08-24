import React from "react";
import Template from "../../hoc/Template";
import Typography from "../Utilities/UI/Typography";

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const userBalance = props => {
  return (
    <Template>
      <div className="user-balance">
        <Typography
          text={props.btc.toFixed(4) + " BTC "}
          type="h1"
          action="auto"
        />
        <Typography
          text={" $ " + numberWithCommas(props.usd)}
          type="h2"
          action="none"
        />
      </div>
    </Template>
  );
};

export default userBalance;
