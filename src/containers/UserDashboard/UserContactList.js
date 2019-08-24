import React, { Component } from "react";
import Template from "../../hoc/Template";
import Contact from "../../components/UserDashboard/Contact";
import Spinner from "../../components/Utilities/UI/Spinner";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import Typography from "../../components/Utilities/UI/Typography";

class UserContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
      filterTerm: "a"
    };
    this.filterTermHandler = this.filterTermHandler.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.getAllUsersDelay();
    }, 1000);
    this.setState({
      ...this.state,
      contacts: this.props.contacts
    });
  }

  getAllUsersDelay(searchTerm) {
    this.props.getAllContacts(searchTerm);
  }

  filterTermHandler(event) {
    const search = event.target.value;
    this.setState({ ...this.state, filterTerm: search });
    this.props.getAllContacts(search);
  }

  render() {
    return this.props.contacts ? (
      <Template>
        <Typography text="My Contacts" type="h2" action="auto" />
        <div className="contact-item">
          <div>Image</div>
          <div>Online</div>
          <div>Fullname</div>
          <div>Phone</div>
        </div>
        <div className="coins-container">
          {this.props.contacts.map(contact => {
            return (
              <Contact
                key={contact._id}
                contact={contact}
                action={() => {
                  this.filterTermHandler();
                }}
              />
            );
          })}
        </div>
      </Template>
    ) : (
      <Spinner />
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.user.contacts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllContacts: filterTerm =>
      dispatch(actionCreators.getAllContacts(filterTerm))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContactList);
