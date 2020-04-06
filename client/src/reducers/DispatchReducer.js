import { GET_DISPATCH_INFO, SEARCH, EXPORT } from ".././actions/Types";

const initialState = {
  dispatchDetails: [],
  excelMessage: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DISPATCH_INFO:
      return { ...state, dispatchDetails: action.payload };
    case SEARCH:
      return { ...state, dispatchDetails: action.payload };
    case EXPORT:
      return { ...state, excelMessage: action.payload };
    default:
      return state;
  }
}
