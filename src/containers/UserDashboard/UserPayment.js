import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import Template from "../../hoc/Template";
import ContactFull from "./ContactFull";

class UserPayment extends Component {
  componentDidMount() {
    this.props.getUserByNum(this.props.match.params.id);
  }

  render() {
    return (
      <Template>
        {this.props.contact ? (
          <ContactFull contact={this.props.contact} />
        ) : (
          <div>Please Refresh</div>
        )}
      </Template>
    );
  }
}

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
