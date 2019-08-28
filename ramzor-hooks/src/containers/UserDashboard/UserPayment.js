import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import ContactFull from "./ContactFull";

const UserPayment = props => {
  useEffect(() => {
    props.getUserByNum(props.match.params.id);
  });

  return (
    <React.Fragment>
      {props.contact ? (
        <ContactFull contact={props.contact} />
      ) : (
        <div>Please Refresh</div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    contact: state.user.contact
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStateToPay: state => dispatch(actionCreators.togglePayState(state)),
    getUserByNum: contactNumber =>
      dispatch(actionCreators.getContactByNumber(contactNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPayment);
