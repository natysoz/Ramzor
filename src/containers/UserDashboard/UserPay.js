import React, { Component } from "react";
import Template from "../../hoc/Template";
import UserContactList from "./UserContactList";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

class UserPay extends Component {
  componentDidMount() {
    this.props.changeStateToPay(true);
  }

  render() {
    return (
      <Template>
        <div className="space-top">
          <UserContactList />
        </div>
      </Template>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeStateToPay: state => dispatch(actionCreators.togglePayState(state))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserPay);
