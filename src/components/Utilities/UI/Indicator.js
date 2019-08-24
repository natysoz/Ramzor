import React from "react";
import Template from "../../../hoc/Template";

const indicator = props => {
  let dotClass = props.isActive ? "online-user" : "offline-user";
  return (
    <Template>
      <div className="dot-container">
        <div className={dotClass} />
      </div>
    </Template>
  );
};

export default indicator;
