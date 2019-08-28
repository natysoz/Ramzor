import React, { useState, useEffect } from "react";
import Typography from "../../components/Utilities/UI/Typography";
import Input from "../../components/Utilities/UI/Input";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
import UserActionButton from "../../components/UserDashboard/UserActionButton";
import AnimatedNumber from "animated-number-react";
import coinService from "../../services/coin.service";

const ContactFull = props => {
  const [value, setValue] = useState(props.userBalance);
  const [amountBtc, setAmountBtc] = useState(0);
  const [amountUsd, setAmountUsd] = useState(0);
  const [allowToSend, setAllowToSend] = useState(false);
  const [duration] = useState(500);

  useEffect(() => {
    async function fetch() {
      const btcUsdPrice = await coinService.getBtcPrice();
      props.setBtcPrice(btcUsdPrice.data.USD.last);
    }
    fetch();
    setAmountUsd(amountBtc * props.bitcoinPrice);
    const allowed = props.btcBalance >= amountBtc && amountBtc > 0.005;
    setAllowToSend(allowed);
    setValue(amountBtc * props.bitcoinPrice);
  }, [amountBtc]);

  const amountToTransferHandler = userInputAmount => {
    setAmountBtc(userInputAmount);
  };

  const maxBalanceHandler = () => {
    var warningStyle;
    props.btcBalance <= amountBtc || amountBtc <= 0.005
      ? (warningStyle = {
          color: "#ff5a5f"
        })
      : (warningStyle = {
          color: "#0ed25e"
        });
    return warningStyle;
  };

  const submitTransferHandler = async () => {
    if (allowToSend && amountBtc >= 0.005) {
      await props.setUserBalance(props.userBalance, amountUsd);
    }
  };

  const animatedState = state => {
    const allowed = !!state;
    if (props.btcBalance >= amountBtc && amountBtc > 0.005) {
      setAllowToSend(allowed);
    }
  };

  const formatValue = value => value.toFixed(2);

  const allowTransfer = allowed => {
    return allowed ? "" : "disabled-link";
  };

  return (
    <React.Fragment>
      <section className="contact-container">
        <div className="pay-contact_full">
          <img src={props.contact.picture} alt="" />
          <Typography
            clr="red"
            text={props.contact.name}
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
          click={amountToTransferHandler}
          step="0.0025"
          placeholder={props.btcBalance.toFixed(3)}
        />

        <div className="animated-amount">
          $
          <AnimatedNumber
            duration={duration}
            value={value}
            formatValue={formatValue}
            begin={() => {
              animatedState();
            }}
            complete={() => {
              animatedState(true);
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
            className={allowTransfer(allowToSend)}
            to="/dashboard/payment/success"
          >
            <UserActionButton
              icon="check"
              color={maxBalanceHandler().color}
              click={submitTransferHandler}
              iconColor="#303030"
              iconSize="60px"
              text="Send"
            />
          </Link>
        </div>
      </section>
    </React.Fragment>
  );
};

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
)(ContactFull);
