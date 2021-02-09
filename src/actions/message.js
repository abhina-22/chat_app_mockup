import * as types from "./types";
import { fetchMessage } from "../api/messages";

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

export const setMessage = (username) => {
  return (dispatch) => {
    dispatch({
      type: types.FETCH_MESSAGE,
    });
    const success = (data) => {
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
