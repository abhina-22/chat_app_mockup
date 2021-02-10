import { data } from "../assets/userInfo";

export const fetchMessage = ({ username, success, error }) => {
  try {
    const userMessage = data.filter((user) => user.name === username);
    success && success(userMessage[0]);
  } catch (e) {
    error && error(e);
  }
};

export const setMessage = ({ username, message, success, error }) => {
  try {
    let userMessage = data.filter((user) => user.name === username);
    userMessage[0].message.push({
      author: "me",
      message: message,
    });
    success && success(userMessage[0]);
  } catch (e) {
    error && error(e);
  }
};
