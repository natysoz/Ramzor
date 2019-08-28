import * as actionTypes from "../../actions/actionTypes";
import objectUpdate from "../../helpers/objectUpdater";

const userStore = {
  balance: 22506,
  token: null,
  isAdmin: false,
  userId: null,
  error: null,
  loading: false,
  contacts: null,
  contact: null,
  modal: false,
  pay: false,
  contactSelected: null
};

// prettier-ignore

function reducer(state = userStore, action) {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:return authFailed(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.TOGGLE_SIDENAV:return toggleSidenav(state, action);
    case actionTypes.SET_CONTACTS: return setContacts(state, action);
    case actionTypes.SET_CONTACT:return setContact(state, action);
    case actionTypes.SET_STATE_PAY: return setPay(state, action);
    case actionTypes.SET_NEW_BALANCE: return setPay(state, action);
    default:
      return state;
  }
}
// prettier-ignore
const authStart = state => objectUpdate(state, { error: null, loading: true });
const authLogout = state =>
  objectUpdate(state, { token: null, isAdmin: null, userId: null });
const authFailed = (state, action) =>
  objectUpdate(state, { error: action.error, loading: false });
const setContacts = (state, action) =>
  objectUpdate(state, { contacts: action.contacts });
const setContact = (state, action) =>
  objectUpdate(state, { contact: action.contact });
const setPay = (state, action) => objectUpdate(state, action);
const toggleSidenav = (state, action) =>
  objectUpdate(state, { modal: action.modal });

// prettier-ignore

const authSuccess = (state, action) => {
  return objectUpdate(state, {
    isAdmin: action.isAdmin,
    token: action.idToken,
    userId: action.userId,
    error: false,
    loading: false
  });
};

export default reducer;
