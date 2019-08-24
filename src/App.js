import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Sidenav from "./containers/Modals/Sidenav/Sidenav";
import Success from "./containers/Transactions/Success/Success";
import asyncComponent from "./hoc/AsyncComponent";
import Template from "./hoc/Template";
import "./styles/global.scss";

const Login = asyncComponent(() => import("./containers/Auth/Login/Login"));
const Logout = asyncComponent(() => import("./containers/Auth/Logout/Logout"));
const UserDashboard = asyncComponent(() =>
  import("./containers/UserDashboard/UserDashboard")
);

const app = props => {
  return (
    <Template>
      {props.modal ? <Sidenav /> : null}
      <Switch>
        <Route path="/dashboard/payment/success" component={Success} />
        <Route path="/dashboard/user" component={UserDashboard} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    </Template>
  );
};

const mapStateToProps = state => {
  return {
    modal: state.user.modal
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(app)
);
