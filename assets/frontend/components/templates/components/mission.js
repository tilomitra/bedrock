import React, { Component } from "react";
import PropTypes from "prop-types";

import Hero from "../bulma/hero";
//import "bulma/css/bulma.css";

class Mission extends Component {
    render() {
        return (
            <section className="pk-mission">
                <Hero {...this.props} />
            </section>
        );
    }
}

Mission.PropTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
};

export default Mission;
