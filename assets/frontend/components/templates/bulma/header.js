import React, { Component } from "react";
import PropTypes from "prop-types";

class Header extends Component {
    render() {
        let styles = {};
        if (this.props.color) {
            styles.color = this.props.color;
        }
        return (
            <h3 className="title is-5 pk-header" style={styles}>
                {this.props.title}
            </h3>
        );
    }
}

Header.PropTypes = {
    title: PropTypes.string
};

export default Header;
