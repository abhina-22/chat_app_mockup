import * as types from "./types";
import { fetchMessage, setMessage } from "../api";

export const fetchMessages = (username) => {
  return (dispatch) => {
    dispatch({
      type: types.FETCH_MESSAGE,
    });
    const success = (data) => {
      localStorage.setItem("selectedUser", JSON.stringify(data));
      return dispatch({
        type: types.FETCH_MESSAGE_SUCCESS,
        payload: data,
      });
    };
    const error = (data) => {
      dispatch({
        type: types.FETCH_MESSAGE_ERROR,
        payload: data,
      });
    };
    fetchMessage({ username, success, error });
  };
};

export const setMessages = (username, message) => {
  return (dispatch) => {
    const success = (data) => {
      localStorage.setItem("selectedUser", JSON.stringify(data));
      return dispatch({
        type: types.SET_MESSAGE_SUCCESS,
        payload: data,
      });
    };
    const error = (data) => {
      dispatch({
        type: types.SET_MESSAGE_ERROR,
        payload: data,
      });
    };
    setMessage({ username, message, success, error });
  };
};
