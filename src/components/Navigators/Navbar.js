import React, { Component } from "react";
import Template from "../../hoc/Template";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    const iconStyle = {
      fontSize: "32px"
    };
    return (
      <Template>
        <header>
          <Icon
            style={iconStyle}
            onClick={() => {
              this.props.toggleMenu(true);
            }}
          >
            menu
          </Icon>
          <div>My Wallet</div>
          <Link
            onClick={() => {
              this.props.changeStateToPay(false);
            }}
            to="/"
          >
            <Icon style={iconStyle}>exit_to_app</Icon>
          </Link>
        </header>
      </Template>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeStateToPay: state => dispatch(actionCreators.togglePayState(state)),
    toggleMenu: toggle => dispatch(actionCreators.toggleModal(toggle))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
