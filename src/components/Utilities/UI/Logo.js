import React from "react";

const logo = props => {
  return (
    <div className="login-logo">
      <img src={props.appLogo} alt="" />
    </div>
  );
};

export default logo;
