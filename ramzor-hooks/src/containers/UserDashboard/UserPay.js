import React from "react";
import UserContactList from "./UserContactList";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

const UserPay = props => {
  props.changeStateToPay(true);
  return (
    <React.Fragment>
      <div className="space-top">
        <UserContactList />
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changeStateToPay: state => dispatch(actionCreators.togglePayState(state))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserPay);
