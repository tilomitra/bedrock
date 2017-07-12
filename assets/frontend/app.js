import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import { Provider, connect, nuclearMixin } from "nuclear-js-react-addons";
import reactor from "./reactor";

import CommonModule from "./modules/common";
import HomeContainer from "./containers/home-container";
import MissionContainer from "./containers/mission-container";
import AchievementContainer from "./containers/achievement-container";
import PreviewContainer from "./containers/render-container";
import MilestoneContainer from "./containers/milestone-container";
import AboutContainer from "./containers/about-container";

import config from "./config";
const shopOrigin = "https://miller-furniture.myshopify.com";

class App extends React.Component {
    render() {
        return (
            <Provider reactor={reactor}>
                <EmbeddedApp
                    shopOrigin={shopOrigin}
                    apiKey={config.apiKey}
                    debug={true}
                >
                    <Router>
                        <div>
                            <Route
                                exact
                                path="/app"
                                component={HomeContainer}
                            />
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
                            <Route
                                exact
                                path="/app/milestones"
                                component={MilestoneContainer}
                            />
                            <Route
                                exact
                                path="/app/about"
                                component={AboutContainer}
                            />
                            <Route
                                exact
                                path="/app/preview"
                                component={PreviewContainer}
                            />
                        </div>
                    </Router>
                </EmbeddedApp>
            </Provider>
        );
    }
}

//ENRTY POINT
//render the view
ReactDOM.render(<App />, document.getElementById("main"));
