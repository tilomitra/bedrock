import React, { Component } from "react";
import PropTypes from "prop-types";

class About extends Component {
    render() {
        return (
            <section className="PK-About">
                <section className="section">
                    <div className="content">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: this.props.content
                            }}
                        />
                    </div>
                </section>
            </section>
        );
    }
}

About.PropTypes = {
    content: PropTypes.string
};

export default About;
