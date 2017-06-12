var React = require("react");

var ReactRouter = require("react-router");
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var ReactDOM = require("react-dom");

var common = require("./modules/common");
var HomePage = require("./components/home");

var routes = (
    <Router>
        <Route path="/" name="home" component={HomePage} />
    </Router>
);

//INITIAL ACTIONS

var bootstrapActions = {
    home: function(rs) {
        //Actions go here.
    }
};

//ENRTY POINT
//render the view
ReactDOM.render(routes, document.getElementById("main"));
