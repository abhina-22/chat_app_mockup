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

    case actionTypes.SET_MESSAGE_SUCCESS:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          message: action.payload,
        },
        errored: false,
      };
    case actionTypes.SET_MESSAGE_ERROR:
      return { ...state, errored: action.payload };
    default:
      return state;
  }
};

const reducers = {
  chat,
};

export default combineReducers(reducers);
