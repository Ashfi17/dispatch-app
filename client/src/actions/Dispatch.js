import { GET_DISPATCH_INFO, SEARCH, EXPORT } from "./Types";
import axios from "axios";
import config from "../config";
const url = config.url + "dispatch";

//function to get the details based on sort input
export const getDispatchInfo = (order) => (dispatch) => {
  return axios
    .post(url + "/sort-by-date", order, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      // console.log()
      dispatch({
        type: GET_DISPATCH_INFO,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//function to search by source code
export const search = (searchTerm) => (dispatch) => {
  return axios
    .post(url + "/search", searchTerm, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res.data.data);
      dispatch({
        type: SEARCH,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//function to export excel sheet
export const exportExcel = () => (dispatch) => {
  return axios
    .get(url + "/get-excel", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      dispatch({
        type: EXPORT,
        payload: res.data.message,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
