import React, { Component } from "react";
import PropTypes from "prop-types";

class Header extends Component {
    render() {
        return (
            <h3 className="title is-5 pk-header">
                {this.props.title}
            </h3>
        );
    }
}

Header.PropTypes = {
    title: PropTypes.string
};

export default Header;
