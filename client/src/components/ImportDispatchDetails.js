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
      } else {
        this.props.getSourceCode();
        this.props.getDestinationCode();
        this.props.getTransporterCode();
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
  };

  handleChange = (event, type) => {
    if (type == "source") this.setState({ sourceValue: event.target.value });
    if (type == "destination")
      this.setState({ destinationValue: event.target.value });
    if (type == "transporter")
      this.setState({ transporterValue: event.target.value });
  };
  saveData = () => {
    let data = {
      source: this.state.source,
      destination: this.state.destination,
      transporter: this.state.transporter,
    };
    this.props.addNewSDT(data);
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

    let dispatchData = {
      source_code: sourceValue,
      destination_code: destinationValue,
      transporter_code: transporterValue,
      start_date: startDate,
      end_date: endDate,
      vehicle_number: vehicleNumber,
    };
    console.log(dispatchData);
    this.props.addNewDispatch(dispatchData);
  };

  render() {
    return (
      <div>
        <div className="add-source-destination">
          <h1>Add source destination and new transporter</h1>
          <input
            id="source-id"
            name="source"
            placeholder="source name"
            type="text"
            value={this.state.source}
            onChange={(e) => this.OnTextChange(e)}
          />
          <input
            id="destination-id"
            name="destination"
            placeholder="destination name"
            type="text"
            value={this.state.destination}
            onChange={(e) => this.OnTextChange(e)}
          />
          <input
            id="transporter-id"
            name="transporter"
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
        </div>
        <div className="add-new-dispatch-info">
          <h1>Add New Dispatch Details</h1>
          {/* <select
            value={this.state.sourceValue}
            onChange={(e) => this.handleChange(e, "source")}
          >
          <input type="text" name="city" list="cityname"></input>
            {this.props.sourceCode.map((sources) => (
              <option value={sources.source_code}>{sources.source_code}</option>
            ))}
          </select> */}
          <input
            type="text"
            list="source-data"
            onChange={this.OnTextChange}
            placeholder="Source code"
          />

          <div
            id="source-data"
            onChange={(e) => {
              this.handleChange(e);
            }}
          >
            {this.props.sourceCode.map((sources, key) => (
              <span key={key}>{sources.source_code}</span>
            ))}
          </div>

          <input
            type="text"
            list="destination-data"
            onChange={this.OnTextChange}
            placeholder="Destination code"
          />
          <datalist id="destination-data">
            {this.props.destinationCode.map((destn) => (
              <option value={destn.destn_code}>{destn.destn_code}</option>
            ))}
          </datalist>
          <input
            type="text"
            list="transporter-data"
            onChange={this.OnTextChange}
            placeholder="Transporter code"
          />
          <datalist id="transporter-data">
            {this.props.transporterCode.map((transporter) => (
              <option value={transporter.source_code}>
                {transporter.transporter_code}
              </option>
            ))}
          </datalist>
          <input
            id="vehicleNumber-id"
            name="vehicleNumber"
            placeholder="vehicle number"
            type="text"
            value={this.state.vehicleNumber}
            onChange={(e) => this.OnTextChange(e)}
          />
          <input
            id="startDate-id"
            name="startDate"
            placeholder="start Date"
            type="text"
            value={this.state.startDate}
            onChange={(e) => this.OnTextChange(e)}
          />
          <input
            id="endDate-id"
            name="endDate"
            placeholder="end Date"
            type="text"
            value={this.state.endDate}
            onChange={(e) => this.OnTextChange(e)}
          />
          <button
            id="add-details-submit-button"
            className="submit-button"
            onClick={this.saveDispatchDetails}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  excelMessage: state.DispatchReducer.excelMessage,
  sourceCode: state.DispatchReducer.sourceCode,
  destinationCode: state.DispatchReducer.destinationCode,
  transporterCode: state.DispatchReducer.transporterCode,
});
export default connect(mapStateToProps, {
  addNewSDT,
  getSourceCode,
  getDestinationCode,
  getTransporterCode,
  addNewDispatch,
})(ImportDispatchDetails);
