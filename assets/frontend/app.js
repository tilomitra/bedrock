import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import HomePage from "./components/home";

var routes = (
    <BrowserRouter>
        <div>
            <Route path="/" name="home" component={HomePage} />
        </div>
    </BrowserRouter>
);

//ENRTY POINT
//render the view
ReactDOM.render(routes, document.getElementById("main"));
