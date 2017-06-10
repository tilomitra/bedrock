// NPM
import React from "react";
import { Router, Route, hashHistory } from "react-router";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Local
import configureStore from "./store/configureStore";

// components
import HomePage from "./components/home";

const store = configureStore(); // You can also pass in an initialState here

//ENRTY POINT
//render the view
ReactDOM.render(
    <Provider store={store}>
        <HomePage />
    </Provider>,
    document.getElementById("main")
);
