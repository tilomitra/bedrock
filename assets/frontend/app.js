import React from "react";
import createClass from "create-react-class";
import { BrowserRouter, Route } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import { Provider, connect, nuclearMixin } from "nuclear-js-react-addons";
import ReactDOM from "react-dom";
import reactor from "./reactor";

import HomePage from "./components/home";

const App = createClass({
    render() {
        return (
            <Provider reactor={reactor}>
                <BrowserRouter>
                    <div>
                        <Route path="/" name="home" component={HomePage} />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
});

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept(App, () => {
        const NextApp = App;
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById("main")
        );
    });
}

//ENRTY POINT
//render the view
ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById("main")
);
