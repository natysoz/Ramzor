import React from "react";
import Template from "../../hoc/Template";
import Indicator from "../Utilities/UI/Indicator";
import { Link } from "react-router-dom";

const contact = props => {
  return (
    <Template>
      <Link className="contact-item" to={`pay/${props.contact.phone}`}>
        <div className="round-image">
          <img src={props.contact.picture} alt="" />
        </div>
        <Indicator isActive={props.contact.isActive} />
        <div>{props.contact.name}</div>
        <div>{props.contact.phone}</div>
      </Link>
    </Template>
  );
};

export default contact;
