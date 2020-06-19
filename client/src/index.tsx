import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import apiServices from "./apiServices/instance";
import store from "./store"

import App from "./App";

apiServices();

ReactDOM.render(
  <Provider store={ store } >
    <Router>
        <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

