import { CREATE_USER, LOGIN, ERROR_MESSAGE } from "../actions/Types";

const initialState = {
  errorMessage: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state };
    case LOGIN:
      return { ...state };
    case ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
