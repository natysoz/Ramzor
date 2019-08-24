import React, { Component } from "react";
import Template from "../../hoc/Template";
import Typography from "../../components/Utilities/UI/Typography";
import Input from "../../components/Utilities/UI/Input";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
import UserActionButton from "../../components/UserDashboard/UserActionButton";
import AnimatedNumber from "animated-number-react";

import axios from "axios";

class contactFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.userBalance,
      amountBtc: 0,
      amountUsd: 0,
      allowToSend: false,
      duration: 500
    };
    this.amountToTransferHandler = this.amountToTransferHandler.bind(this);
    this.submitTransferHandler = this.submitTransferHandler.bind(this);
  }

  async componentDidMount() {
    const btcUsdPrice = await axios.get("https://blockchain.info/ticker");
    this.props.setBtcPrice(btcUsdPrice.data.USD.last);
  }

  amountToTransferHandler = userInputAmount => {
    this.setState({ amountBtc: userInputAmount }, () => {
      this.setState(
        { amountUsd: this.state.amountBtc * this.props.bitcoinPrice },
        () => {
          const allowed =
            this.props.btcBalance >= this.state.amountBtc &&
            this.state.amountBtc > 0.005;
          this.setState({ allowToSend: allowed });
          this.handleChange(this.state.amountUsd);
        }
      );
    });
  };

  maxBalanceHandler() {
    var warningStyle;
    this.props.btcBalance <= this.state.amountBtc ||
    this.state.amountBtc <= 0.005
      ? (warningStyle = {
          color: "#ff5a5f"
        })
      : (warningStyle = {
          color: "#0ed25e"
        });
    return warningStyle;
  }

  async submitTransferHandler() {
    if (this.state.allowToSend && this.state.amountBtc >= 0.005) {
      await this.props.setUserBalance(
        this.props.userBalance,
        this.state.amountUsd
      );
    } else console.log("NOT ALLOWED");
  }

  animatedState(state) {
    const allowed = !!state;
    if (
      this.props.btcBalance >= this.state.amountBtc &&
      this.state.amountBtc > 0.005
    ) {
      this.setState({ allowToSend: allowed });
    }
  }

  handleChange = amountUsd => {
    this.setState({ value: amountUsd });
  };

  formatValue = value => value.toFixed(2);

  render() {
    const allowTransfer = allowed => {
      return allowed ? "" : "disabled-link";
    };

    return (
      <Template>
        <section className="contact-container">
          <div className="pay-contact_full">
            <img src={this.props.contact.picture} alt="" />
            <Typography
              clr="red"
              text={this.props.contact.name}
              type="h2"
              action="auto"
            />
          </div>

          <Input
            input="custom-input"
            url="https://res.cloudinary.com/dvvx6eoye/image/upload/v1566355600/bitcoin-logo_xporhx.png"
            size="0"
            inputSize="60"
            clr="whitesmoke"
            value="number"
            click={this.amountToTransferHandler}
            step="0.0025"
            placeholder={this.props.btcBalance.toFixed(3)}
          />

          <div className="animated-amount">
            $
            <AnimatedNumber
              duration={this.state.duration}
              value={this.state.value}
              formatValue={this.formatValue}
              begin={() => {
                this.animatedState();
              }}
              complete={() => {
                this.animatedState(true);
              }}
            />
          </div>

          <Typography
            text="Will get(After Our 0.225% Fee)"
            type="h4"
            action="auto"
          />

          <div className="approve-icons">
            <Link to="/dashboard/user/pay">
              <UserActionButton
                icon="arrow_back"
                color="#FF5A5F"
                iconColor="#303030"
                iconSize="60px"
                text="Back"
              />
            </Link>

            <Link
              className={allowTransfer(this.state.allowToSend)}
              to="/dashboard/payment/success"
            >
              <UserActionButton
                icon="check"
                color={this.maxBalanceHandler().color}
                click={this.submitTransferHandler}
                iconColor="#303030"
                iconSize="60px"
                text="Send"
              />
            </Link>
          </div>
        </section>
      </Template>
    );
  }
}

const mapStateToProps = state => {
  return {
    bitcoinPrice: state.coin.btcPrice,
    btcBalance: state.coin.btc,
    userBalance: state.user.balance
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStateToPay: () => dispatch(actionCreators.togglePayState()),
    convertUserBalance: amount => dispatch(actionCreators.usdToBtc(amount)),
    setBtcPrice: btcPrice => dispatch(actionCreators.setBitcoinRatio(btcPrice)),
    setUserBalance: (oldBalance, amount) =>
      dispatch(actionCreators.setNewBalance(oldBalance, amount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(contactFull);
