import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Provider, connect, nuclearMixin } from "nuclear-js-react-addons";
import reactor from "./reactor";

import CommonModule from "./modules/common";
import HomeContainer from "./containers/home-container";
import MissionContainer from "./containers/mission-container";
import AchievementContainer from "./containers/achievement-container";

class App extends React.Component {
    render() {
        return (
            <Provider reactor={reactor}>
                <Router>
                    <div>
                        <Route exact path="/app" component={HomeContainer} />
                        <Route
                            exact
                            path="/app/mission"
                            component={MissionContainer}
                        />
                        <Route
                            exact
                            path="/app/achievements"
                            component={AchievementContainer}
                        />
                    </div>
                </Router>
            </Provider>
        );
    }
}

//ENRTY POINT
//render the view
ReactDOM.render(<App />, document.getElementById("main"));
