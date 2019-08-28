import React from "react";
import Indicator from "../Utilities/UI/Indicator";
import { Link } from "react-router-dom";

const contact = props => {
  return (
    <React.Fragment>
      <Link className="contact-item" to={`pay/${props.contact.phone}`}>
        <div className="round-image">
          <img src={props.contact.picture} alt="" />
        </div>
        <Indicator isActive={props.contact.isActive} />
        <div>{props.contact.name}</div>
        <div>{props.contact.phone}</div>
      </Link>
    </React.Fragment>
  );
};

export default contact;
