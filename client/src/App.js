import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import ImportDispatchDetails from "./components/ImportDispatchDetails";

import "./App.css";

function App() {
  return (
    <Router>
      <Route exact path="/sign-up" component={SignUp}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/import-new" component={ImportDispatchDetails}></Route>
    </Router>
  );
}

export default App;
