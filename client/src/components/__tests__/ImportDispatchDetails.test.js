import React from "react";
import { shallow } from "enzyme";
import { ImportDispatchDetails } from "../ImportDispatchDetails";
import { exportExcel } from "../../actions/Dispatch";

const addNewSDT = jest.fn();
const getSourceCode = jest.fn();
const getDestinationCode = jest.fn();
const getTransporterCode = jest.fn();
const addNewDispatch = jest.fn();
const history = {
  push: jest.fn(),
  // location: { state: { message: "Token Expired please login again" } },
};

const sourceCode = [{ source_code: "S001" }, { source_code: "S002" }];
const destinationCode = [{ destn_code: "D001" }, { destn_code: "D002" }];
const transporterCode = [
  { transporter_code: "T001" },
  { transporter_code: "T002" },
];

const wrapper = shallow(
  <ImportDispatchDetails
    addNewSDT={addNewSDT}
    getSourceCode={getSourceCode}
    getDestinationCode={getDestinationCode}
    getTransporterCode={getTransporterCode}
    addNewDispatch={addNewDispatch}
    history={history}
    sourceCode={sourceCode}
    destinationCode={destinationCode}
    transporterCode={transporterCode}
  />
);

describe("testing import dispatch details component", () => {
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should test if the new source destination and transporter are getting added and the functions :OnTextChange,saveData are working ", () => {
    const OnTextChange = jest.spyOn(wrapper.instance(), "OnTextChange");
    const saveData = jest.spyOn(wrapper.instance(), "saveData");
    let source = {
      target: {
        name: "source",
        value: "source name",
      },
    };
    let destination = {
      target: {
        name: "destination",
        value: "destination name",
      },
    };
    let transporter = {
      target: {
        name: "transporter",
        value: "transporter name",
      },
    };
    wrapper.find("#source-id").simulate("change", source);
    wrapper.find("#destination-id").simulate("change", destination);
    wrapper.find("#transporter-id").simulate("change", transporter);
    expect(wrapper.state().source).toBe("source name");
    expect(wrapper.state().destination).toBe("destination name");
    expect(wrapper.state().transporter).toBe("transporter name");
    expect(OnTextChange).toBeCalled();
    wrapper.find("#add-details-submit-button").simulate("click");
    expect(saveData).toBeCalled();
    expect(addNewSDT).toBeCalled();
  });
  it("should test if the functions handleFocus,addCode,handleBlur are working and if the source code are being added", () => {
    const OnTextChange = jest.spyOn(wrapper.instance(), "OnTextChange");
    const handleFocus = jest.spyOn(wrapper.instance(), "handleFocus");
    const addCode = jest.spyOn(wrapper.instance(), "addCode");
    //for source code input field
    let sourceValue = {
      target: {
        name: "sourceValue",
        value: "sourceValue name",
      },
    };
    wrapper.find("#sourceValue-id").simulate("change", sourceValue);
    expect(OnTextChange).toBeCalled();
    wrapper.find("#sourceValue-id").simulate("focus", sourceValue);
    expect(handleFocus).toBeCalled();

    expect(getSourceCode).toBeCalled();
    expect(wrapper.state().sourceValueFlag).toBe(true);
    expect(wrapper.find("#source-item0").props().children).toBe("S001");
    wrapper.find("#source-item0").simulate("click");
    expect(addCode).toBeCalled();
    expect(wrapper.state().sourceValueFlag).toBe(false);
  });
  it("should test if the functions handleFocus,addCode,handleBlur are working and if the destination code are being added", () => {
    const OnTextChange = jest.spyOn(wrapper.instance(), "OnTextChange");
    const handleFocus = jest.spyOn(wrapper.instance(), "handleFocus");
    const addCode = jest.spyOn(wrapper.instance(), "addCode");

    //for destination code input field
    let destinationValue = {
      target: {
        name: "destinationValue",
        value: "destinationValue name",
      },
    };
    wrapper.find("#destinationValue-id").simulate("change", destinationValue);
    expect(OnTextChange).toBeCalled();
    wrapper.find("#destinationValue-id").simulate("focus", destinationValue);
    expect(handleFocus).toBeCalled();
    expect(getDestinationCode).toBeCalled();
    expect(wrapper.state().destinationValueFlag).toBe(true);
    expect(wrapper.find("#destination-item0").props().children).toBe("D001");
    wrapper.find("#destination-item0").simulate("click");
    expect(addCode).toBeCalled();
    expect(wrapper.state().destinationValueFlag).toBe(false);
  });
  it("should test if the functions handleFocus,addCode,handleBlur are working and if the transporter code are being added", () => {
    const OnTextChange = jest.spyOn(wrapper.instance(), "OnTextChange");
    const handleFocus = jest.spyOn(wrapper.instance(), "handleFocus");
    const addCode = jest.spyOn(wrapper.instance(), "addCode");

    //for transporter code input field
    let transporterValue = {
      target: {
        name: "transporterValue",
        value: "transporterValue name",
      },
    };
    wrapper.find("#transporterValue-id").simulate("change", transporterValue);
    expect(OnTextChange).toBeCalled();
    wrapper.find("#transporterValue-id").simulate("focus", transporterValue);
    expect(handleFocus).toBeCalled();
    expect(getTransporterCode).toBeCalled();
    expect(wrapper.state().transporterValueFlag).toBe(true);
    expect(wrapper.find("#transporter-item0").props().children).toBe("T001");
    wrapper.find("#transporter-item0").simulate("click");
    expect(addCode).toBeCalled();
    expect(wrapper.state().transporterValueFlag).toBe(false);
  });
});
