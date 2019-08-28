import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import Sidenav from "./containers/Modals/Sidenav/Sidenav";
import "./styles/global.scss";
import Spinner from "./components/Utilities/UI/Spinner";


const Login = React.lazy(() => {return import("./containers/Auth/Login/Login");});
const Success = React.lazy(() => {return import("./containers/Transactions/Success/Success");});
const Logout = React.lazy(() => {return import("./containers/Auth/Logout/Logout");});
const UserDashboard = React.lazy(() => {return import("./containers/UserDashboard/UserDashboard");});

const app = props => {
  return <React.Fragment>
      {props.modal ? <Sidenav /> : null}
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route
            path="/dashboard/payment/success"
            render={props => <Success {...props} />}
          />
          <Route
            path="/dashboard/user"
            render={props => <UserDashboard {...props} />}
          />
          <Route path="/logout" render={props => <Logout {...props} />} />
          <Route path="/" exact render={props => <Login {...props} />} />
        </Switch>
      </Suspense>
    </React.Fragment>
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
