import React, { Component } from "react";
import PropTypes from "prop-types";

class Section extends Component {
    render() {
        const fluid = this.props.fluid ? " is-fluid" : null;
        return (
            <section className={"section" + fluid}>
                <div className="container">
                    <h1 className="title">Featured In</h1>

                    <h2 className="subtitle">
                        March 2017 Issue of Homes and Houses
                    </h2>
                </div>
            </section>
        );
    }
}

Section.PropTypes = {
    fluid: PropTypes.bool,
    title: PropTypes.string,
    subtitle: PropTypes.string
};

export default Section;
