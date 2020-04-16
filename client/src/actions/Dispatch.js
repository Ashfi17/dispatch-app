import {
  GET_DISPATCH_INFO,
  SEARCH,
  EXPORT,
  ADD_SOURCE_DESTINATION_TRANSPORTER,
  GET_DESTINATION_CODE,
  GET_SOURCE_CODE,
  GET_TRANSPORTER_CODE,
  ADD_NEW_DISPATCH,
  ERROR_DISPATCH_MESSAGE,
} from "./Types";
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

//++++++++  for Importing new data ++++++++

// action for adding new source destination and transporter
export const addNewSDT = (data) => (dispatch) => {
  console.log("action called");
  return axios
    .post(url + "/add-source-destination", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      dispatch({
        type: ADD_SOURCE_DESTINATION_TRANSPORTER,
        payload: res.data.message,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_DISPATCH_MESSAGE,
        payload: err.response.data.message,
      });
    });
};

//action for getting all the source codes
export const getSourceCode = () => (dispatch) => {
  return axios
    .get(url + "/source_code", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      dispatch({
        type: GET_SOURCE_CODE,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
//action for getting all the destination codes
export const getDestinationCode = () => (dispatch) => {
  return axios
    .get(url + "/destination_code", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      dispatch({
        type: GET_DESTINATION_CODE,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//action for getting all the transporter codes
export const getTransporterCode = () => (dispatch) => {
  return axios
    .get(url + "/transporter_code", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      dispatch({
        type: GET_TRANSPORTER_CODE,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addNewDispatch = (dispatchData) => (dispatch) => {
  return axios
    .post(url + "/add-dispatch-details", dispatchData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      dispatch({
        type: ADD_NEW_DISPATCH,
        payload: res.data.message,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR_DISPATCH_MESSAGE,
        payload: err.response.data.message,
      });
    });
};
