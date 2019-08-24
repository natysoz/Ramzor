import React, { Component } from "react";
import Template from "../../../hoc/Template";
import Nav from "../../../components/Navigators/Navbar";
import Spinner from "../../../components/Utilities/UI/Spinner";
import Typography from "../../../components/Utilities/UI/Typography";
import AnimatedNumber from "animated-number-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserActionButton from "../../../components/UserDashboard/UserActionButton";
import * as actionCreators from "../../../store/actions";

class Success extends Component {
  state = {
    animationEnded: false,
    showBalance: false,
    value: 0,
    delay: Math.random() * 10 * 1000
  };

  componentDidMount() {
    this.delaySetTimeOut(this.state.delay);
  }

  delaySetTimeOut(delay) {
    setTimeout(() => {
      this.setState({
        ...this.state,
        showBalance: true
      });
    }, delay);
  }

  formatValue = value => value.toFixed(2);
  animatedState = () => this.setState({ animationEnded: true });

  render() {
    return (
      <Template>
        <Nav />
        <div className="success-container">
          {this.state.showBalance ? (
            <div className="animated-amount">
              <Typography text="Your new Balance is" type="h5" action="auto" />
              <Template>
                $
                <AnimatedNumber
                  complete={() => {
                    this.animatedState(true);
                  }}
                  value={this.props.balance}
                  formatValue={this.formatValue}
                />
              </Template>
              {this.state.animationEnded ? (
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
      </Template>
    );
  }
}

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
