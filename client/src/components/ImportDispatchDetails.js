import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import "../assets/styles/ImportDetails.css";
import {
  addNewSDT,
  getSourceCode,
  getDestinationCode,
  getTransporterCode,
  addNewDispatch,
} from "../actions/Dispatch";
import { connect } from "react-redux";

export class ImportDispatchDetails extends Component {
  state = {
    source: "",
    destination: "",
    transporter: "",
    vehicleNumber: "",
    startDate: "",
    endDate: "",
    sourceValue: "",
    destinationValue: "",
    transporterValue: "",
    sourceValueFlag: false,
    destinationValueFlag: false,
    transporterValueFlag: false,
    errorMessage: "",
    successMessage: "",
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      var decode = jwt_decode(localStorage.getItem("token"));

      //checking if the token is expired or not
      if (Date.now() > decode.exp * 1000) {
        //if token is expired push to login page
        this.props.history.push("/login", {
          message: "Token expired please login again",
        });
      }
    } else {
      this.props.history.push("/login", {
        message: "No token present, please login",
      });
    }
  }

  OnTextChange = (event) => {
    this.setState({
      errorMessage: "",
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "sourceValue") {
      if (event.target.value === "") this.setState({ sourceValueFlag: false });
    }
    if (event.target.name === "destinationValue") {
      if (event.target.value === "")
        this.setState({ destinationValueFlag: false });
    }
    if (event.target.name === "transporterValue") {
      if (event.target.value === "")
        this.setState({ transporterValueFlag: false });
    }
  };

  saveData = () => {
    var decode = jwt_decode(localStorage.getItem("token"));

    if (Date.now() > decode.exp * 1000) {
      this.props.history.push("/login", {
        message: "Token expired please login again",
      });
    } else {
      let data = {
        source: this.state.source,
        destination: this.state.destination,
        transporter: this.state.transporter,
      };
      this.props.addNewSDT(data);

      this.setState({
        source: "",
        destination: "",
        transporter: "",
        errorMessage: "Added Successfully",
      });
    }
  };

  saveDispatchDetails = async () => {
    const {
      sourceValue,
      destinationValue,
      transporterValue,
      vehicleNumber,
      startDate,
      endDate,
    } = this.state;
    var decode = jwt_decode(localStorage.getItem("token"));

    if (Date.now() > decode.exp * 1000) {
      this.props.history.push("/login", {
        message: "Token expired please login again",
      });
    } else {
      let dispatchData = {
        source_code: sourceValue,
        destination_code: destinationValue,
        transporter_code: transporterValue,
        start_date: startDate,
        end_date: endDate,
        vehicle_number: vehicleNumber,
      };

      this.props.addNewDispatch(dispatchData);
      this.setState({
        sourceValue: "",
        destinationValue: "",
        transporterValue: "",
        startDate: "",
        endDate: "",
        vehicleNumber: "",
      });
    }
  };

  addCode = (code, type) => {
    if (type === "source")
      this.setState({ sourceValue: code, sourceValueFlag: false });
    if (type === "destination")
      this.setState({ destinationValue: code, destinationValueFlag: false });
    if (type === "transporter")
      this.setState({ transporterValue: code, transporterValueFlag: false });
  };

  handleFocus = (event) => {
    var decode = jwt_decode(localStorage.getItem("token"));
    if (event.target.name === "sourceValue") {
      //checking is the token is expired
      if (Date.now() > decode.exp * 1000) {
        this.props.history.push("/login", {
          message: "Token expired please login again",
        });
      } else {
        this.props.getSourceCode();
        this.setState({ sourceValueFlag: true });
      }
    }
    if (event.target.name === "destinationValue") {
      if (Date.now() > decode.exp * 1000) {
        this.props.history.push("/login", {
          message: "Token expired please login again",
        });
      } else {
        this.props.getDestinationCode();
        this.setState({ destinationValueFlag: true });
      }
    }
    if (event.target.name === "transporterValue") {
      if (Date.now() > decode.exp * 1000) {
        this.props.history.push("/login", {
          message: "Token expired please login again",
        });
      } else {
        this.props.getTransporterCode();
        this.setState({ transporterValueFlag: true });
      }
    }
  };

  handleBlur = (target) => {
    if (target === "sourceValue") this.setState({ sourceValueFlag: false });
    if (target === "destinationValue")
      this.setState({ destinationValueFlag: false });
    if (target === "transporterValue")
      this.setState({ transporterValueFlag: false });
  };
  render() {
    return (
      <div>
        <div className="add-source-destination">
          <h1>Add new source,destination and transporter</h1>
          <input
            id="source-id"
            name="source"
            className="data-input-field"
            placeholder="source name"
            type="text"
            value={this.state.source}
            onChange={(e) => this.OnTextChange(e)}
          />
          <input
            id="destination-id"
            name="destination"
            className="data-input-field"
            placeholder="destination name"
            type="text"
            value={this.state.destination}
            onChange={(e) => this.OnTextChange(e)}
          />
          <input
            id="transporter-id"
            name="transporter"
            className="data-input-field"
            placeholder="transporter name"
            type="text"
            value={this.state.transporter}
            onChange={(e) => this.OnTextChange(e)}
          />
          <button
            id="add-details-submit-button"
            className="submit-button"
            onClick={this.saveData}
          >
            Save
          </button>
          <span className="error-disptach-text">
            {this.props.errordispatchMessage
              ? this.props.errordispatchMessage
              : this.props.DataMessage
              ? this.props.DataMessage
              : null}
          </span>
        </div>
        <h1 style={{ textAlign: "center" }}>Add New Dispatch Details</h1>
        <div className="add-new-dispatch-info">
          <div className="left-card-section">
            <input
              id="sourceValue-id"
              type="text"
              value={this.state.sourceValue}
              className="data-input-field"
              name="sourceValue"
              onChange={(e) => this.OnTextChange(e)}
              placeholder="Source code eg:S001"
              onFocus={(e) => this.handleFocus(e)}
            />
            {this.state.sourceValueFlag === true ? (
              <div id="code-list-id" className="codeList">
                {this.props.sourceCode.map((sources, key) => (
                  <span
                    id={"source-item" + key}
                    className="list-items"
                    key={key}
                    onClick={() => {
                      this.addCode(sources.source_code, "source");
                    }}
                    onBlur={() => this.handleBlur("sourceValue")}
                  >
                    {sources.source_code}
                  </span>
                ))}
              </div>
            ) : null}

            <input
              id="destinationValue-id"
              type="text"
              value={this.state.destinationValue}
              className="data-input-field right-section-input"
              name="destinationValue"
              onChange={this.OnTextChange}
              placeholder="Destination code eg:D001"
              onFocus={(e) => this.handleFocus(e)}
            />
            {this.state.destinationValueFlag === true ? (
              <div id="code-list-id" className="codeList">
                {this.props.destinationCode.map((destn, key) => (
                  <span
                    className="list-items"
                    id={"destination-item" + key}
                    key={key}
                    onClick={() => {
                      this.addCode(destn.destn_code, "destination");
                    }}
                    onBlur={() => this.handleBlur("destinationValue")}
                  >
                    {destn.destn_code}
                  </span>
                ))}
              </div>
            ) : null}
            <input
              type="text"
              id="transporterValue-id"
              value={this.state.transporterValue}
              className="data-input-field right-section-input"
              name="transporterValue"
              onChange={this.OnTextChange}
              placeholder="Transporter code eg:T001"
              onFocus={(e) => this.handleFocus(e)}
            />
            {this.state.transporterValueFlag === true ? (
              <div id="code-list-id" className="codeList">
                {this.props.transporterCode.map((transporter, key) => (
                  <span
                    key={key}
                    className="list-items"
                    id={"transporter-item" + key}
                    onClick={() => {
                      this.addCode(transporter.transporter_code, "transporter");
                    }}
                    onBlur={() => this.handleBlur("transporterValue")}
                  >
                    {transporter.transporter_code}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="right-card-section">
            <input
              id="vehicleNumber-id"
              name="vehicleNumber"
              placeholder="vehicle number"
              className="data-input-field "
              type="text"
              value={this.state.vehicleNumber}
              onChange={(e) => this.OnTextChange(e)}
            />
            <input
              id="startDate-id"
              name="startDate"
              placeholder="start Date"
              type="text"
              className="data-input-field right-section-input"
              value={this.state.startDate}
              onChange={(e) => this.OnTextChange(e)}
            />
            <input
              id="endDate-id"
              name="endDate"
              className="data-input-field right-section-input"
              placeholder="end Date"
              type="text"
              value={this.state.endDate}
              onChange={(e) => this.OnTextChange(e)}
            />
          </div>
        </div>

        <button
          id="add-dispatch-details-button"
          className="save-dispatch-button"
          onClick={this.saveDispatchDetails}
        >
          Add
        </button>
        <span
          className="error-disptach-text"
          style={{ paddingBottom: "30px", textAlign: "center" }}
        >
          {this.props.errordispatchMessage
            ? this.props.errordispatchMessage
            : this.props.DispatchInfoMessage
            ? this.props.DispatchInfoMessage
            : null}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  excelMessage: state.DispatchReducer.excelMessage,
  sourceCode: state.DispatchReducer.sourceCode,
  destinationCode: state.DispatchReducer.destinationCode,
  transporterCode: state.DispatchReducer.transporterCode,
  DispatchInfoMessage: state.DispatchReducer.DispatchInfoMessage,
  errordispatchMessage: state.DispatchReducer.errordispatchMessage,
  DataMessage: state.DispatchReducer.DataMessage,
});
export default connect(mapStateToProps, {
  addNewSDT,
  getSourceCode,
  getDestinationCode,
  getTransporterCode,
  addNewDispatch,
})(ImportDispatchDetails);
