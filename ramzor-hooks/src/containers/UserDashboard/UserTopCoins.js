import React, { useEffect } from "react";
import Typography from "../../components/Utilities/UI/Typography";
import Spinner from "../../components/Utilities/UI/Spinner";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import Coin from "../../components/UserDashboard/UserTopCoinItem";

const UserTopCoins = props => {
  useEffect(() => {
    const id = setTimeout(() => {
      props.getTopCoinsLastDay(20);
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  return props.coins ? (
    <React.Fragment>
      <div className="space-top">
        <Typography text="Top Coins of Today" type="h2" action="auto" />
        <div className="coins-container">
          {props.coins.map(coin => {
            return <Coin key={coin.CoinInfo.Id} coin={coin} />;
          })}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Spinner />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getTopCoinsLastDay: limit => dispatch(actionCreators.getTopCoins(limit))
  };
};

const mapStateToProps = state => {
  return {
    coins: state.coin.coins
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTopCoins);
