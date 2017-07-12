import React, { Component } from "react";
import PropTypes from "prop-types";
class Hero extends Component {
    render() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <h1 className="title">
                        {this.props.title}
                    </h1>
                    {this.props.subtitle
                        ? <h2 className="subtitle">
                              {this.props.subtitle}
                          </h2>
                        : null}
                </div>
            </section>
        );
    }
}

Hero.PropTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
};

export default Hero;
