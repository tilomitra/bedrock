import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import uuidv4 from "uuid/v4";

class Level extends Component {
    render() {
        let styles = {};
        if (this.props.color) {
            styles.color = this.props.color;
        }

        const titleJsx = (
            <p
                key={uuidv4()}
                className={classnames("title", this.props.titleClass)}
            >
                {this.props.title}
            </p>
        );
        const headingJsx = (
            <p
                className={classnames("heading", this.props.headingClass)}
                style={styles}
                key={uuidv4()}
            >
                {this.props.heading}
            </p>
        );
        let orderJsx = [titleJsx, headingJsx];

        if (this.props.reverse) {
            orderJsx = orderJsx.reverse();
        }

        return (
            <div className="level-item has-text-centered">
                <div>
                    {orderJsx}
                </div>
            </div>
        );
    }
}

Level.PropTypes = {
    title: PropTypes.string,
    titleClass: PropTypes.string,
    heading: PropTypes.string,
    headingClass: PropTypes.string,
    reverse: PropTypes.bool
};

export default Level;
