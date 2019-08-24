import React from "react";
import Icon from "@material-ui/core/Icon";

const input = props => {
  var divStyle = {
    fontSize: props.size + "px",
    color: props.clr
  };
  var inputStyle = {
    fontSize: props.inputSize + "px"
  };

  var customIcon = content => {
    if (content.icon) return <Icon style={divStyle}>{content.icon}</Icon>;
    else if (content.url) return <img src={content.url} alt="content" />;
  };

  return (
    <div className={props.input}>
      {customIcon(props)}
      <input
        style={inputStyle}
        onChange={e => {
          props.click(e.target.value);
        }}
        type={props.value}
        step={props.step}
        placeholder={props.placeholder}
        autoComplete="new-password"
      />
    </div>
  );
};



export default input;
