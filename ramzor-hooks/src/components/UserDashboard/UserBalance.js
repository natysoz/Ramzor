import React from "react";
import Typography from "../Utilities/UI/Typography";

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const userBalance = props => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default userBalance;
