import React from "react";
import Template from "../../hoc/Template";
import UserActionButton from "./UserActionButton";
import Typography from "../Utilities/UI/Typography";
import { Link } from "react-router-dom";

const userActions = () => {
  return (
    <Template>
      <section className="user-actions">
        <Typography text="What Next?" type="h2" action="none" />
        <div className="user-action">
          <Link to="/dashboard/user/get">
            <UserActionButton
              rotate="135"
              icon="send"
              color="#0ed25e"
              iconColor="#303030"
              iconSize="38px"
              text="Get"
            />
          </Link>
          <Link to="/dashboard/user/prices">
            <UserActionButton
              icon="equalizer"
              color="#ffb912"
              iconColor="#303030"
              iconSize="38px"
              text="Prices"
            />
          </Link>
          <Link to="/dashboard/user/pay">
            <UserActionButton
              rotate="-45"
              icon="send"
              color="#FF5A5F"
              iconColor="#303030"
              iconSize="38px"
              text="Pay"
            />
          </Link>
        </div>
      </section>
    </Template>
  );
};

export default userActions;
