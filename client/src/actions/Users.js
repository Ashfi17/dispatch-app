import { CREATE_USER, LOGIN, ERROR_MESSAGE } from "./Types";
import config from "../config";
import axios from "axios";
const url = config.url + "users";

export const createUser = (userDetail, history) => (dispatch) => {
  return axios
    .post(url + "/new", userDetail)
    .then((res) => {
      dispatch({
        type: CREATE_USER,
      });
      history.push("/login");
    })
    .catch((err) => {
      // console.log(err.response.data.message);
      dispatch({ type: ERROR_MESSAGE, payload: err.response.data.message });
    });
};
export const login = (userCredentials, history) => (dispatch) => {
  return axios
    .post(url + "/login", userCredentials)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN,
      });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: ERROR_MESSAGE, payload: err.response.data.message });
    });
};
