import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";
import Typography from "../../components/Utilities/UI/Typography";
import Input from "../../components/Utilities/UI/Input";
import * as actionCreators from "../../store/actions";

const UserContactSearch = props => {
  return (
    <React.Fragment>
      <div className="pay-container">
        <Link
          onClick={() => props.changeStateToPay(false)}
          to="/dashboard/user/prices"
        >
          <div className="pay-cancel">
            <Icon>arrow_back</Icon>
            <Typography text="Back" type="h2" action="auto" />
          </div>
        </Link>

        <Input
          input="login-input"
          size="26"
          clr="whitesmoke"
          value="text"
          icon="search"
          placeholder="Search Contact"
          click={props.getAllContacts}
        />
        <Typography
          clr="red"
          text="Search by Name and Phone"
          type="h4"
          action="auto"
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    btc: state.coin.btc,
    pay: state.user.pay
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStateToPay: state => dispatch(actionCreators.togglePayState(state)),
    getAllContacts: filterTerm =>
      dispatch(actionCreators.getAllContacts(filterTerm))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContactSearch);
