import React from "react";
import Template from "../../hoc/Template";
import CoinChart from "../../components/Utilities/UI/CoinChart";

const userCoinInfo = props => {
  return (
    <Template>
      <CoinChart coin={props.match.params.id} />
    </Template>
  );
};

export default userCoinInfo;
