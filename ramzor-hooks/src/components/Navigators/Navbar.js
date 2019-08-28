import React  from "react";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";

const Navbar = props =>  {
    const iconStyle = {
      fontSize: "32px"
    };
    return (
      <React.Fragment>
        <header>
          <Icon
            style={iconStyle}
            onClick={() => {
              props.toggleMenu(true);
            }}
          >
            menu
          </Icon>
          <div>My Wallet</div>
          <Link
            onClick={() => {
              props.changeStateToPay(false);
            }}
            to="/"
          >
            <Icon style={iconStyle}>exit_to_app</Icon>
          </Link>
        </header>
      </React.Fragment>
    );
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
