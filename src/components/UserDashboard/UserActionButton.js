import React from "react";
import Template from "../../hoc/Template";
import { Icon } from "@material-ui/core";

const userActionButton = props => {

  const styles = {
    backgroundColor: props.color
  };
  const iconStyle = {
    fontSize: props.iconSize,
    color: props.iconColor,
    transform: `rotate(${props.rotate + "deg"})`
  };

  return (
    <Template>
      <div onClick={props.click} className={props.styleClass}>
        <div style={styles} className="button-circle">
          <Icon style={iconStyle}>{props.icon}</Icon>
        </div>
        <p>{props.text}</p>
      </div>
    </Template>
  );
};

export default userActionButton;
