import React, { useState, useEffect } from "react";
import Nav from "../../../components/Navigators/Navbar";
import Spinner from "../../../components/Utilities/UI/Spinner";
import Typography from "../../../components/Utilities/UI/Typography";
import AnimatedNumber from "animated-number-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserActionButton from "../../../components/UserDashboard/UserActionButton";
import * as actionCreators from "../../../store/actions";

const Success = props => {
  const initialDelay = Math.random() * 10 * 1000;
  const [delay] = useState(initialDelay);
  const [showBalance, setShowBalance] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    delaySetTimeOut(delay);
  },);

  const delaySetTimeOut = delay => {
    setTimeout(() => {
      setShowBalance(true);
    }, delay);
  };

  const formatValue = value => value.toFixed(2);
  const animatedState = state => setAnimationEnded(state);

  return (
    <React.Fragment>
      <Nav />
      <div className="success-container">
        {showBalance ? (
          <div className="animated-amount">
            <Typography text="Your new Balance is" type="h5" action="auto" />
            <React.Fragment>
              $
              <AnimatedNumber
                complete={() => {
                  animatedState(true);
                }}
                value={props.balance}
                formatValue={formatValue}
              />
            </React.Fragment>
            {animationEnded ? (
              <div className="animate-in">
                <Link to="/dashboard/user/pay">
                  <UserActionButton
                    styleClass="success-button"
                    icon="thumb_up"
                    color="#ebb811"
                    iconColor="#303030"
                    iconSize="30px"
                  />
                </Link>
                <Typography text="Done" type="h5" action="auto" />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="success-loading">
            <Spinner />
            <Typography text="Please wait..." type="h2" action="auto" />
            <Typography
              text="We transfer Your bitcoins"
              type="h3"
              action="auto"
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changeStateToPay: () => dispatch(actionCreators.togglePayState())
  };
};

const mapStateToProps = state => {
  return {
    balance: state.user.balance
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Success);
