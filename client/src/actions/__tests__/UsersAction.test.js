import * as action from "../Users";

import { CREATE_USER, LOGIN } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import config from "../../config";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const url = config.url + "users";
describe("testing user actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  //   it("should craete an acton with the CREATE_USER and the payload should be same as the api response when the response is 200", () => {
  //     const responseOfApi = [{}, {}, {}];
  //     const store = mockStore({});
  //     const userDetails = {
  //       user_name: "test name",
  //       user_email: "test@gmail.com",
  //       user_password: "abc1234",
  //       user_address: "address line 123",
  //     };
  //     moxios.stubRequest(url + "/new", userDetails, {
  //       status: 200,
  //       response: { data: responseOfApi },
  //     });

  //     const expectedActions = [
  //       {
  //         type: CREATE_USER,
  //       },
  //     ];
  //     return store.dispatch(action.createUser(userDetails)).then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  //   });
  it("should login a user successfully and return status code of 200 with a message", () => {
    const responseOfApi = [{}, {}];
    const store = mockStore({});
    let user = {
      email: "dummy@gmail.com",
      password: "password123",
    };
    // Stubbing the request
    moxios.stubRequest(url + "/login", user, {
      status: 200,
      response: { data: responseOfApi },
    });
    // defining the expected reponse
    const expectedResponse = [
      {
        type: LOGIN,
      },
    ];
    store.dispatch(action.login(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
