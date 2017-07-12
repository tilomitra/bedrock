import React, { Component } from "react";
import PropTypes from "prop-types";
import Level from "../bulma/level";

class Milestone extends Component {
    render() {
        let contentJsx = [];
        if (this.props.type === "stars") {
            for (let i = 0; i < this.props.amount; i++) {
                contentJsx.push(<span>★</span>);
            }
        } else {
            contentJsx = [this.props.amount, <span>+</span>];
        }

        return (
            <section className="column has-text-centered is-one-third">
                <section className="pk-milestone">
                    <Level
                        title={contentJsx}
                        titleClass={"pk-milestone-title"}
                        heading={this.props.description}
                        headingClass={"pk-milestone-heading"}
                    />
                </section>
            </section>
        );
    }
}
Milestone.PropTypes = {
    description: PropTypes.string,
    amount: PropTypes.number,
    type: PropTypes.oneOf(["stars", "count"])
};

export default Milestone;
