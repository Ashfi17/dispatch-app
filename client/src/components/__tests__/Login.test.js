import React from "react";
import { shallow } from "enzyme";
import { Login } from "../Login";

const login = jest.fn();
const history = {
  push: jest.fn(),
  location: { state: { message: "Token Expired please login again" } },
};

const wrapper = shallow(<Login login={login} history={history} />);

describe("should test the Login component", () => {
  it("should test if the component renders properly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should check if the text is being typed and the onTextChange function is called", () => {
    const OnTextChange = jest.spyOn(wrapper.instance(), "OnTextChange");

    const email = {
      target: "dummy email",
    };

    const password = {
      target: "dummy password",
    };

    wrapper.find("#login-email").simulate("change", email);
    expect(OnTextChange).toBeCalled();

    wrapper.find("#login-password").simulate("change", password);
    expect(OnTextChange).toBeCalled();
  });
  it("should check if the action is called if all the condtions are validated", () => {
    const loginUser = jest.spyOn(wrapper.instance(), "loginUser");
    wrapper.setState({
      name: "test name",
      email: "dummy@gmail.com",
      address: "address line 123",
      password: "abc1234",
      confirmPassword: "abc1234",
    });
    wrapper.find("#login-submit-button").simulate("click");
    expect(loginUser).toBeCalled();
    expect(wrapper.state().errorMessage).toBe("");
    expect(login).toBeCalledWith(
      {
        user_email: "dummy@gmail.com",

        user_password: "abc1234",
      },
      history
    );
  });
});
