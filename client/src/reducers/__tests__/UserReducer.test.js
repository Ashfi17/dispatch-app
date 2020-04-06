import user from "../UserReducer";
import { CREATE_USER, LOGIN, ERROR_MESSAGE } from "../../actions/Types";

describe("testing user reducer", () => {
  it("should return the success message equal to the payload in the action type CREATE_USER(when initial state is undefined)", () => {
    const action = {
      type: CREATE_USER,
    };
    const returnedState = user(undefined, action);
    expect(returnedState).toEqual({
      errorMessage: "",
    });
  });
  it("should return the success message equal to the payload in the action type CREATE_USER(when initial state is undefined)", () => {
    const action = {
      type: LOGIN,
    };
    const returnedState = user(undefined, action);
    expect(returnedState).toEqual({
      errorMessage: "",
    });
  });
  it("should return the success message equal to the payload in the action type CREATE_USER(when initial state is undefined)", () => {
    const action = {
      type: ERROR_MESSAGE,
      payload: "email already exists",
    };
    const returnedState = user(undefined, action);
    expect(returnedState).toEqual({
      errorMessage: action.payload,
    });
  });
  it("should return a state object with search array equal to the payload in the action when the action type is default (when the returned state is  an initial state)", () => {
    const initialState = {
      errorMessage: "",
    };
    const action = {
      payload: "",
    };
    const returnedState = user(initialState, action);
    expect(returnedState).toEqual({
      errorMessage: action.payload,
    });
  });
});
