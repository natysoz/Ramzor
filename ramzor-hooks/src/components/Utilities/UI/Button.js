import React from "react";

const Button = props => {
  return (
    <button onClick={props.action} className={props.shape}>
      {props.text}
    </button>
  );
};

export default Button;
