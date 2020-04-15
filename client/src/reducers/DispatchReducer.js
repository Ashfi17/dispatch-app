import {
  GET_DISPATCH_INFO,
  SEARCH,
  EXPORT,
  ADD_SOURCE_DESTINATION_TRANSPORTER,
  GET_SOURCE_CODE,
  GET_DESTINATION_CODE,
  GET_TRANSPORTER_CODE,
  ADD_NEW_DISPATCH,
} from ".././actions/Types";

const initialState = {
  dispatchDetails: [],
  sourceCode: [],
  destinationCode: [],
  transporterCode: [],
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
    case ADD_SOURCE_DESTINATION_TRANSPORTER:
      return state;
    case GET_SOURCE_CODE:
      return { ...state, sourceCode: action.payload };
    case GET_DESTINATION_CODE:
      return { ...state, destinationCode: action.payload };
    case GET_TRANSPORTER_CODE:
      return { ...state, transporterCode: action.payload };
    case ADD_NEW_DISPATCH:
      return state;
    default:
      return state;
  }
}
