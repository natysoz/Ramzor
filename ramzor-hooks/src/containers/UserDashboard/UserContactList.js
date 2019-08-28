import React, { useState } from "react";
import Contact from "../../components/UserDashboard/Contact";
import Spinner from "../../components/Utilities/UI/Spinner";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import Typography from "../../components/Utilities/UI/Typography";

const UserContactList = props => {
  const [filterTerm, setFilterTerm] = useState("");

  setTimeout(() => {
    getAllUsersDelay();
  }, 1500);

  const getAllUsersDelay = searchTerm => {
    props.getAllContacts(searchTerm);
  };

  const filterTermHandler = event => {
    const search = event.target.value;
    setFilterTerm(search);
    props.getAllContacts(filterTerm);
  };

  return props.contacts ? (
    <React.Fragment>
      <Typography text="My Contacts" type="h2" action="auto" />
      <div className="contact-item">
        <div>Image</div>
        <div>Online</div>
        <div>Fullname</div>
        <div>Phone</div>
      </div>
      <div className="coins-container">
        {props.contacts.map(contact => {
          return (
            <Contact
              key={contact._id}
              contact={contact}
              action={() => {
                filterTermHandler();
              }}
            />
          );
        })}
      </div>
    </React.Fragment>
  ) : (
    <Spinner />
  );
};

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
