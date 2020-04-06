import { combineReducers } from "redux";
import users from "./UserReducer";
import dispatch from "./DispatchReducer";

export default combineReducers({
  UserReducer: users,
  DispatchReducer: dispatch,
});
