import { data } from "../assets/userInfo";

export const fetchMessage = ({ username, success, error }) => {
  try {
    const userMessage = data.filter((user) => user.name === username);
    success && success(userMessage[0]);
  } catch (e) {
    error && error(e);
  }
};
