import React, { Component } from "react";
import Template from "../../../hoc/Template";
import github from "../../../assets/git.png";
import linkedin from "../../../assets/linkdin.png";
import cancel from "../../../assets/cancel.png";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class Sidenav extends Component {
  render() {
    return (
      <Template>
        <div className="sidenav-container">
          <div
            onClick={() => this.props.toggleMenu(false)}
            className="close-modal"
          >
            <img src={cancel} alt="my Git Hub" />
            <div>Close</div>
          </div>

          <div className="github">
            <a href="https://github.com/natysoz">
              <img src={github} alt="my Git Hub" />
            </a>
            <div>My GitHub</div>
          </div>

          <div className="github">
            <a href="https://www.linkedin.com/in/natanel-yosef-soussana-884b91ab/">
              <img src={linkedin} alt="my Social" />
            </a>
            <div>Me on Social</div>
          </div>
        </div>

        <div
          onClick={() => this.props.toggleMenu(false)}
          className="sidenav-cancel"
        />
      </Template>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: toggle => dispatch(actionCreators.toggleModal(toggle))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Sidenav);
