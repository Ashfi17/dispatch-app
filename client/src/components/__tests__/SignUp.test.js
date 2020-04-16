import React from "react";
import { shallow } from "enzyme";
import { SignUp } from "../SignUp";

const createUser = jest.fn();
const history = { push: jest.fn() };

const wrapper = shallow(<SignUp createUser={createUser} history={history} />);

describe("Signup test suite", () => {
  it("should match the snapshpot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should check if the text is being typed and the onTextChange function is called", () => {
    const OnTextChange = jest.spyOn(wrapper.instance(), "OnTextChange");
    const name = {
      target: "dummy name",
    };
    const email = {
      target: "dummy email",
    };

    const password = {
      target: "dummy password",
    };
    wrapper.find("#signup-name").simulate("change", name);
    expect(OnTextChange).toBeCalled();
    wrapper.find("#signup-email").simulate("change", email);
    expect(OnTextChange).toBeCalled();

    wrapper.find("#signup-password").simulate("change", password);
    expect(OnTextChange).toBeCalled();
  });
  it("shoud check if the condtions for register are being validated and if not it should show the error message", () => {
    wrapper.setState({
      name: "test name",
      email: "",
      address: "address123",
      password: "",
      confirmPassword: "",
    });
    wrapper.find("#signup-submit-button").simulate("click");
    expect(wrapper.state().errorMessage).toBe("Enter all the fields");
    wrapper.setState({
      name: "test name",
      email: "dummy@gmail.com",
      address: "address line 123",
      password: "abcdefg",
      confirmPassword: "abcfgt565",
    });
    wrapper.find("#signup-submit-button").simulate("click");
    expect(wrapper.state().errorMessage).toBe("Password does not match");
    wrapper.setState({
      name: "test name",
      email: "dummy@gmail.com",
      address: "address line 123",
      password: "abc",
      confirmPassword: "abc",
    });
    wrapper.find("#signup-submit-button").simulate("click");
    expect(wrapper.state().errorMessage).toBe(
      "Password length should be greater then 5!"
    );
  });
  it("should check if the action is called if all the condtions are validated", () => {
    const validateAndRegister = jest.spyOn(
      wrapper.instance(),
      "validateAndRegister"
    );
    wrapper.setState({
      name: "test name",
      email: "dummy@gmail.com",

      password: "abc1234",
      confirmPassword: "abc1234",
    });
    wrapper.find("#signup-submit-button").simulate("click");
    expect(validateAndRegister).toBeCalled();
    expect(wrapper.state().errorMessage).toBe("");
    expect(createUser).toBeCalledWith(
      {
        user_name: "test name",
        user_email: "dummy@gmail.com",

        user_password: "abc1234",
      },
      history
    );
  });
});
