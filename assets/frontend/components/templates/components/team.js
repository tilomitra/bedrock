import React, { Component } from "react";
import PropTypes from "prop-types";
import Level from "../bulma/level";

class Team extends Component {
    render() {
        return (
            <article className="media">
                <figure className="media-left">
                    <p className="image is-128x128">
                        <img
                            src={this.props.imageUrl}
                            alt={`Photo of ${this.props.name}`}
                        />
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong
                                style={{
                                    marginRight: 5,
                                    color: this.props.color
                                }}
                            >
                                <a href={`mailto:${this.props.email}`}>
                                    {this.props.name}
                                </a>
                            </strong>
                            <small>{this.props.position}</small> <br />
                            {this.props.description}
                        </p>
                    </div>
                </div>
            </article>
        );
    }
}
Team.PropTypes = {
    name: PropTypes.string,
    position: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    imageUrl: PropTypes.string
};

export default Team;
