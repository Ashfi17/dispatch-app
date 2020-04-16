import React from "react";
import { shallow } from "enzyme";
import { Home } from "../Home";

const getDispatchInfo = jest.fn();
const search = jest.fn();
const exportExcel = jest.fn();
const history = {
  push: jest.fn(),
  // location: { state: { message: "Token Expired please login again" } },
};

const dispatchDetails = [
  {
    delivery_number: 1,
    source_code: "S001",
    destination_code: "D001",
    transporter_code: "T001",
    vehicle_number: "MH04AB1234",
    start_date: "2020-01-21",
    end_date: "2020-02-22",
  },
];

const wrapper = shallow(
  <Home
    getDispatchInfo={getDispatchInfo}
    search={search}
    exportExcel={exportExcel}
    dispatchDetails={dispatchDetails}
    history={history}
  />
);

beforeAll(() => {
  localStorage.setItem("token", "abcdefgh");
});
afterAll(() => {
  localStorage.removeItem("token");
});

describe("test suite for Home component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should test  the functions is working when user searches ", () => {
    const OnTextChange = jest.spyOn(wrapper.instance(), "OnTextChange");
    const searchSourceCode = jest.spyOn(wrapper.instance(), "searchSourceCode");
    const event = {
      target: "search",
    };
    wrapper.find("#search").simulate("change", event);
    expect(OnTextChange).toBeCalled();
    expect(searchSourceCode).toBeCalled();
  });
  it("should test the button clicks and check if the sortByDate function is being called", () => {
    const onSortByStartDateSelected = jest.spyOn(
      wrapper.instance(),
      "onSortByStartDateSelected"
    );
    expect(wrapper.find("#sort-btn").simulate("click"));
    wrapper.instance().forceUpdate();
    expect(onSortByStartDateSelected).toBeCalled();
  });
  it("should test the button clicks and check if the action functions are being called", () => {
    wrapper.find("#export-button").simulate("click");
    expect(exportExcel).toBeCalled();
  });
});
