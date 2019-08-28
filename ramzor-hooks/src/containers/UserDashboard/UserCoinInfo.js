import React from "react";
import CoinChart from "../../components/Utilities/UI/CoinChart";

const userCoinInfo = props => {
  return (
    <React.Fragment>
      <CoinChart coin={props.match.params.id} />
    </React.Fragment>
  );
};

export default userCoinInfo;
