import * as actionCreators from "../../store/actions/index";
import React, { Component } from "react";
import Template from "../../hoc/Template";
import Navbar from "../../components/Navigators/Navbar";
import UserBalance from "../../components/UserDashboard/UserBalance";
import UserActions from "../../components/UserDashboard/UserActions";
import asyncComponent from "../../hoc/AsyncComponent";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

const UserTopCoins = asyncComponent(() => import("./UserTopCoins"));
const UserQrCode = asyncComponent(() => import("./UserQrCode"));
const UserPay = asyncComponent(() => import("./UserPay"));
const UserCoinInfo = asyncComponent(() => import("./UserCoinInfo"));
const UserPayment = asyncComponent(() => import("./UserPayment"));
const UserContactSearch = asyncComponent(() => import("./UserContactSearch"));

class UserDashboard extends Component {
  componentDidMount() {
    this.props.convertUserBalance(this.props.balance);
  }

  render() {
    return (
      <Template>
        <Navbar />
        <UserBalance btc={this.props.btc} usd={this.props.balance} />
        {!this.props.contact ? (
          <Template>
            {" "}
            {this.props.pay ? <UserContactSearch /> : <UserActions />}
          </Template>
        ) : null}
        <Route path="/dashboard/user/get" exact component={UserQrCode} />
        <Route path="/dashboard/user/prices" exact component={UserTopCoins} />
        <Route path="/dashboard/user/prices/:id" component={UserCoinInfo} />
        <Route path="/dashboard/user/pay" exact component={UserPay} />
        <Route path="/dashboard/user/pay/:id" component={UserPayment} />
      </Template>
    );
  }
}

const mapStateToProps = state => {
  return {
    btc: state.coin.btc,
    balance: state.user.balance,
    pay: state.user.pay,
    contact: state.user.contact
  };
};

const mapDispatchToProps = dispatch => {
  return {
    convertUserBalance: amount => dispatch(actionCreators.usdToBtc(amount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDashboard);
