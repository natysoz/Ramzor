import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../components/Utilities/UI/Logo";
import Button from "../../../components/Utilities/UI/Button";
import Spinner from "../../../components/Utilities/UI/Spinner";
import Typography from "../../../components/Utilities/UI/Typography";
import Input from "../../../components/Utilities/UI/Input";
import appLogo from "../../../assets/logo.png";
import * as actionCreators from "../../../store/actions";

const login = props => {
  return (
    <form>
      <section className="login-container">
        {props.loading ? <Spinner /> : null}
        {props.loading ? null : <Logo appLogo={appLogo} />}

        <div className="login-title">
          <span>{`{`}</span> Demo Bitcoin-wallet <span>{`}`}</span>
        </div>
        <Input
          input="login-input"
          click={() => {}}
          size="26"
          clr="#ebb811"
          value="text"
          icon="locker"
          placeholder="Enter Your BTC address"
        />
        <div>
          <Typography
            text="it's a demo , Just click Login"
            type="h3"
            action="none"
          />
        </div>

        <Link to="dashboard/user/prices">
          <Button
            text="Login"
            shape="button-rect"
            action={() => {
              props.onUserLogin("user");
            }}
          />
        </Link>

        <div>
          <Typography text="Forgot your password ?" type="h3" action="click" />
          <Typography
            text="New to Ramzoor? Create one"
            type="h3"
            action="click"
            func={() => {}}
          />
        </div>
      </section>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    btc: state.coin.btc,
    error: state.user.error,
    loading: state.user.loading,
    user: state.user.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserLogin: type => dispatch(actionCreators.onLogin(type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
