import React, { useEffect, Suspense } from "react";
import Navbar from "../../components/Navigators/Navbar";
import UserBalance from "../../components/UserDashboard/UserBalance";
import UserActions from "../../components/UserDashboard/UserActions";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import * as actionCreators from "../../store/actions/index";


const UserTopCoins = React.lazy(() => {return import("./UserTopCoins");});
const UserPay = React.lazy(() => {return import("./UserPay");});
const UserCoinInfo = React.lazy(() => {return import("./UserCoinInfo");});
const UserPayment = React.lazy(() => {return import("./UserPayment");});
const UserContactSearch = React.lazy(() => {return import("./UserContactSearch");});
const UserQrCode = React.lazy(() => {return import("./UserQrCode");});

/* eslint-disable */
const UserDashboard = props => {
  useEffect(() => {
    props.convertUserBalance(props.balance);
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <UserBalance btc={props.btc} usd={props.balance} />
      {!props.contact ? (
        <React.Fragment>
          {props.pay ? <UserContactSearch /> : <UserActions />}
        </React.Fragment>
      ) : null}
      <Suspense fallback={<div>Loading...</div>}>
        <Route
          path="/dashboard/user/get"
          exact
          render={props => <UserQrCode {...props} />}
        />
        <Route
          path="/dashboard/user/prices"
          exact
          render={props => <UserTopCoins {...props} />}
        />
        <Route
          path="/dashboard/user/prices/:id"
          render={props => <UserCoinInfo {...props} />}
        />
        <Route
          path="/dashboard/user/pay"
          exact
          render={props => <UserPay {...props} />}
        />
        <Route
          path="/dashboard/user/pay/:id"
          render={props => <UserPayment {...props} />}
        />
      </Suspense>
    </React.Fragment>
  );
};

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
