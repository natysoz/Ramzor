import React, { Component } from "react";
import Template from "../../hoc/Template";
import Typography from "../../components/Utilities/UI/Typography";
import Spinner from "../../components/Utilities/UI/Spinner";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import Coin from "../../components/UserDashboard/UserTopCoinItem";

class UserTopCoins extends Component {
  state = {
    coins: this.props.coins,
    limit: 10
  };

  componentDidMount() {
    if (this.state.coins) return;
    this.props.getTopCoinsLastDay(this.state.limit);
  }

  render() {
    return this.props.coins ? (
      <Template>
        <div className="space-top">
          <Typography text="Top Coins of Today" type="h2" action="auto" />
          <div className="coins-container">
            {this.props.coins.map(coin => {
              return <Coin key={coin.CoinInfo.Id} coin={coin} />;
            })}
          </div>
        </div>
      </Template>
    ) : (
      <Spinner />
    );
  }
}

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
