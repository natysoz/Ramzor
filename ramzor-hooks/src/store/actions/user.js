import * as actionTypes from "./actionTypes";
import axios from "axios";
import contactService from "../../services/user.service";

const API_KEY = "AIzaSyAURMhSyCtwSgaLBVAXnlPLv4ZiIlK98_Q";
const SIGN_IN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const userInfo = userType => {
  return {
    email: userType === "admin" ? "admin@gmail.com" : "user@gmail.com",
    password: "ASDasd1990sdf9",
    returnSecureToken: true
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, isAdmin) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    isAdmin: isAdmin
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const setAllContacts = contacts => {
  return {
    type: actionTypes.SET_CONTACTS,
    contacts: contacts
  };
};

const setPaymentStat = selectedContact => {
  return {
    type: actionTypes.SET_STATE_PAY,
    contactSelected: selectedContact
  };
};

export const onSetPaymentState = selectedContact => {
  return dispatch => {
    dispatch(setPaymentStat(selectedContact));
  };
};

export const getAllContacts = filterTerm => {
  const contacts = contactService.getContacts(filterTerm);
  return dispatch => {
    dispatch(setAllContacts(contacts));
  };
};

export const getContactByNumber = contactNumber => {
  const contact = contactService.getContactByNum(contactNumber);
  return dispatch => {
    dispatch(setWatchingContact(contact));
  };
};

const setWatchingContact = contact => {
  return {
    type: actionTypes.SET_CONTACT,
    contact: contact
  };
};

export const onLogin = userType => {
  const isAdmin = userType === "admin";
  return async dispatch => {
    dispatch(authStart());
    const withTheUser = userInfo(userType);
    try {
      const userData = await axios.post(SIGN_IN, withTheUser);
      const expirationDate = new Date(
        new Date().getTime() + userData.data.expiresIn * 1000
      );
      localStorage.setItem("token", userData.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", userData.data.localId);
      dispatch(
        authSuccess(userData.data.idToken, userData.data.localId, isAdmin)
      );
      dispatch(checkAuthTimeout(userData.data.expiresIn));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

//Maybe will be nice to split more into the object itself and the dispatch :S ? overkill
export const setStateToPayMode = state => {
  return {
    type: actionTypes.SET_STATE_PAY,
    pay: state,
    contact: null
  };
};

export const togglePayState = (state = true) => {
  return dispatch => {
    dispatch(setStateToPayMode(state));
  };
};

export const toggleModal = toggle => {
  return dispatch => {
    dispatch({
      type: actionTypes.TOGGLE_SIDENAV,
      modal: toggle
    });
  };
};
