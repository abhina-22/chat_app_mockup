import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const chat = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload,
        fetching: false,
        errored: false,
      };
    case actionTypes.FETCH_MESSAGE:
      return { ...state, fetching: true };
    case actionTypes.FETCH_MESSAGE_ERROR:
      return { ...state, errored: action.payload, fetching: false };
    default:
      return state;
  }
};

const reducers = {
  chat,
};

export default combineReducers(reducers);
