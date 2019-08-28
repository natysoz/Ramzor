import React from "react";

const indicator = props => {
  let dotClass = props.isActive ? "online-user" : "offline-user";
  return (
    <React.Fragment>
      <div className="dot-container">
        <div className={dotClass} />
      </div>
    </React.Fragment>
  );
};

export default indicator;
