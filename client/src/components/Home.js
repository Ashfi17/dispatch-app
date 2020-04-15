import React, { Component } from "react";
import { getDispatchInfo, search, exportExcel } from "../actions/Dispatch";
import { connect } from "react-redux";
import "../assets/styles/Home.css";
import jwt_decode from "jwt-decode";
export class Home extends Component {
  state = {
    search: "",
    descendingOrder: false,
    message: "",
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      var decode = jwt_decode(localStorage.getItem("token"));
      console.log(decode);
      //checking if the token is expired or not
      if (Date.now() > decode.exp * 1000) {
        //if token is expired push to login page
        this.props.history.push("/login", {
          message: "Token expired please login again",
        });
      } else this.props.getDispatchInfo({ order: "desc" });
    } else {
      this.props.history.push("/login", {
        message: "No token present, please login",
      });
    }
  }
  //function to handle text change in search
  OnTextChange = (event) => {
    var decode = jwt_decode(localStorage.getItem("token"));
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (Date.now() > decode.exp * 1000) {
      this.props.history.push("/login", {
        message: "Token expired please login again",
      });
    } else this.searchSourceCode();
  };
  timeOutId = null;

  //this function executes the action function after the user stops typing
  searchSourceCode = () => {
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      if (!this.state.search) {
        this.props.getDispatchInfo({ order: "desc" });
      } else {
        this.props.search({ search: this.state.search });
      }
    }, 1000);
  };

  //function to sort the table content by startdate either ascending or descenfing
  onSortByStartDateSelected = () => {
    let { descendingOrder } = this.state;
    var decode = jwt_decode(localStorage.getItem("token"));
    this.setState({ descendingOrder: !descendingOrder }, () => {
      if (descendingOrder === true) {
        //checking if the token is expired
        if (Date.now() > decode.exp * 1000) {
          this.props.history.push("/login", {
            message: "Token expired please login again",
          });
        } else this.props.getDispatchInfo({ order: "desc" });
      } else {
        if (Date.now() > decode.exp * 1000) {
          this.props.history.push("/login", {
            message: "Token expired please login again",
          });
        } else this.props.getDispatchInfo({ order: "asc" });
      }
    });
  };

  render() {
    return (
      <div>
        <div className="table-card">
          <div className="search-sort-container">
            <input
              id="search"
              className="search-field"
              name="search"
              placeholder="search by source code"
              value={this.state.search}
              onChange={(e) => this.OnTextChange(e)}
            />
            <button
              id="sort-btn"
              className="heading-buttons"
              onClick={this.onSortByStartDateSelected}
            >
              Sort By Start Date
            </button>
            <button
              id="export-button"
              className="heading-buttons"
              onClick={async () => {
                var decode = jwt_decode(localStorage.getItem("token"));
                //checking is the token is expired
                if (Date.now() > decode.exp * 1000) {
                  this.props.history.push("/login", {
                    message: "Token expired please login again",
                  });
                } else {
                  //this function creates the excel sheet
                  await this.props.exportExcel();
                  this.setState({ message: this.props.excelMessage });
                  clearTimeout(this.timeOutId);
                  this.timeOutId = setTimeout(() => {
                    this.setState({ message: "" });
                  }, 5000);
                }
              }}
            >
              Export To excel
            </button>
            <button
              className="heading-buttons"
              onClick={() => this.props.history.push("/import-new")}
            >
              Add New Detail
            </button>
          </div>
          <table id="table-container">
            <tr>
              <th>Delivery No.</th>
              <th>Source Code</th>
              <th>Destination Code</th>
              <th>Transporter Code</th>
              <th>Vehicle Number</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
            {this.props.dispatchDetails.map((info, index) => (
              <tr key={index}>
                <td>{info.delivery_number}</td>
                <td>{info.source_code}</td>
                <td>{info.destination_code}</td>
                <td>{info.transporter_code}</td>
                <td>{info.vehicle_number}</td>
                <td>{new Date(info.start_date).toISOString().slice(0, 10)}</td>
                <td>{new Date(info.end_date).toISOString().slice(0, 10)}</td>
              </tr>
            ))}
          </table>
          <p className="message">{this.state.message}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dispatchDetails: state.DispatchReducer.dispatchDetails,
  excelMessage: state.DispatchReducer.excelMessage,
});

export default connect(mapStateToProps, {
  getDispatchInfo,
  search,
  exportExcel,
})(Home);
