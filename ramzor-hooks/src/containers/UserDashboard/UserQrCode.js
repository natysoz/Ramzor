import React, { useState } from "react";
import Spinner from "../../components/Utilities/UI/Spinner";
import Typography from "../../components/Utilities/UI/Typography";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QR from "../../assets/QR.png";
import SweetAlert from "sweetalert2-react";

const UserQrCode = () => {
  const [display, setDisplay] = useState(false);
  const [copied, setCopied] = useState(false);
  const [value] = useState("1LcX76LAJTJLvjvHMEB7pPwaV28mMk");

  setTimeout(() => {
    displayQr();
  }, 1500);

  const displayQr = () => setDisplay(true);

  return (
    <React.Fragment>
      <div className="space-top">
        <Typography text="Share QR Code and get Paid" type="h2" action="auto" />
        <div className="user-qr">
          <Typography text="Total Transactions" type="h3" action="auto" />
          <Typography text="4" type="h3" action="auto" />
        </div>
        <Typography text={value} type="h3" action="auto" />
        <div>
          {display ? <img src={QR} alt="Generating QR" /> : <Spinner />}
        </div>
        {display ? (
          <div className="copy-link">
            <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
              <span className="button-rect">Copy Address</span>
            </CopyToClipboard>
          </div>
        ) : (
          <Typography text="Loading QR..." type="h2" action="auto" />
        )}
      </div>

      <SweetAlert
        show={copied}
        title="Copied!"
        text="Now go Get Paid"
        onConfirm={() => {
          setCopied(false);
        }}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userOd: state.user.userId
  };
};

export default connect(mapStateToProps)(UserQrCode);
