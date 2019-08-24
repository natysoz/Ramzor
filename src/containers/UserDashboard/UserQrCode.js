import React, { Component } from "react";
import Template from "../../hoc/Template";
import Spinner from "../../components/Utilities/UI/Spinner";
import Typography from "../../components/Utilities/UI/Typography";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "../../components/Utilities/UI/Button";
import QR from "../../assets/QR.png";

import SweetAlert from "sweetalert2-react";

class UserQrCode extends Component {
  state = {
    display: false,
    copied: false,
    show: false,
    demoDelay: null,
    value: "1LcX76LAJTJLvjvHMEB7pPwaV28mMk"
  };

  componentDidMount() {
    this.setState({
      demoDelay: setTimeout(() => {
        this.displayQr();
      }, 1000)
    });
  }

  componentWillUnmount() {
    clearTimeout(this.state.demoDelay);
    this.setState({ demoDelay: null });
  }

  displayQr() {
    if (this.state.demoDelay !== null) {
      this.setState({
        ...this.state,
        display: true
      });
    }
  }

  render() {
    return (
      <Template>
        <div className="space-top">
          <Typography
            text="Share QR Code and get Paid"
            type="h2"
            action="auto"
          />
          <div className="user-qr">
            <Typography text="Total Transactions" type="h3" action="auto" />
            <Typography text="4" type="h3" action="auto" />
          </div>
          <Typography text={this.state.value} type="h3" action="auto" />
          <div>
            {this.state.display ? (
              <img src={QR} alt="Generating QR" />
            ) : (
              <Spinner />
            )}
          </div>
          {this.state.display ? (
            <div className="copy-link">
              <CopyToClipboard
                text={this.state.value}
                onCopy={() => this.setState({ copied: true })}
              >
                <span className="button-rect">Copy Address</span>
              </CopyToClipboard>
            </div>
          ) : (
            <Typography text="Loading QR..." type="h2" action="auto" />
          )}
        </div>

        <SweetAlert
          show={this.state.copied}
          title="Copied!"
          text="Now go Get Paid"
          onConfirm={() => this.setState({ show: false, copied: false })}
        />
      </Template>
    );
  }
}

const mapStateToProps = state => {
  return {
    userOd: state.user.userId
  };
};

export default connect(mapStateToProps)(UserQrCode);
