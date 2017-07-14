import React, { Component } from "react";
import PropTypes from "prop-types";
import Level from "../bulma/level";

class Achievement extends Component {
    render() {
        let achievementType;
        let headerJsx;

        switch (this.props.type) {
            case "award":
                achievementType = "Won an award at";
                break;

            case "post":
                achievementType = "Wrote a prominent post in";
                break;

            case "feature":
                achievementType = "Featured in";
                break;

            default:
                achievementType = "Featured in";
                break;
        }

        achievementType += " " + this.props.publicationName;

        if (this.props.imageUrl) {
            headerJsx = (
                <img
                    src={this.props.imageUrl}
                    className="pk-achievement-image"
                    alt={this.props.publicationName}
                />
            );
        } else {
            headerJsx = (
                <h3 className="title is-4 pk-achievement-pubname">
                    {this.props.publicationName}
                </h3>
            );
        }

        return (
            <section className="column has-text-centered is-one-third">
                <section className="pk-achievement">
                    {headerJsx}

                    <Level
                        heading={achievementType}
                        headingClass={"pk-achievement-heading"}
                        title={this.props.name}
                        titleClass={"is-4 pk-achievement-title"}
                        reverse={true}
                        color={this.props.color}
                    />
                    <a
                        href={this.props.publishLink}
                        target="_blank"
                        className="pk-achievement-link"
                    >
                        {" "} Learn More →
                    </a>
                </section>
            </section>
        );
    }
}
Achievement.PropTypes = {
    name: PropTypes.string,
    publicationName: PropTypes.string,
    publishLink: PropTypes.string,
    imageUrl: PropTypes.string,
    type: PropTypes.oneOf(["award", "post", "feature"])
};

export default Achievement;
