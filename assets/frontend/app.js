// NPM
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Local
import configureStore from "./store/configureStore";

// components
import HomePage from "./components/home";
import FooPage from "./components/foo";

const store = configureStore(); // You can also pass in an initialState here

const Root = ({ store }) =>
    <Provider store={store}>
        <Router>
            <div>
                <ul>
                    <li><Link to={"/"}>Index</Link></li>
                    <li><Link to={"/app/foo"}>Foo</Link></li>
                </ul>
                <Route exact path={"/"} component={HomePage} />
                <Route path={"/app/foo"} component={FooPage} />
            </div>
        </Router>
    </Provider>;

//ENRTY POINT
//render the view
ReactDOM.render(<Root store={store} />, document.getElementById("main"));
