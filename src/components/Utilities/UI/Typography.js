import React from "react";

const typography = props => {
  return (
    <props.type className={props.action} onClick={props.func}>
      {props.text}
    </props.type>
  );
};

export default typography;
