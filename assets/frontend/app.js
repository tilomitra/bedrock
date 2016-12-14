var React = require('react');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory
var ReactDOM = require('react-dom');

var common = require('./modules/common');
var HomePage = require('./components/home');



var routes = (
  <Router history={hashHistory}>
    <Route path="/" name="home" component={HomePage} />
  </Router>
);

//INITIAL ACTIONS

var bootstrapActions = {

    "home": function(rs) {
        //Actions go here.
    }
}


//ENRTY POINT
//render the view
ReactDOM.render(routes, document.getElementById("main"));