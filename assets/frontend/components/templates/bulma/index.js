import React, { Component } from "react";
import Hero from "./hero";
import Section from "./section";
class Miller extends Component {
    render() {
        return (
            <section style={{ width: 900, margin: "0 auto" }}>
                <Hero title={"Hello. We are Miller"} />
                <Hero
                    title={"Our Mission"}
                    subtitle={
                        "To provide modern furniture for small spaces. Made from sustainable sources."
                    }
                />

                <h3>Articles and Awards</h3>
                <section className="columns">
                    <div className="column">
                        <Section
                            title="Featured In"
                            subtitle="March 2017 Issue of Homes and Houses"
                            fluid={true}
                        />
                    </div>
                    <div className="column">
                        <Section
                            title="Featured In"
                            subtitle="March 2017 Issue of Homes and Houses"
                            fluid={true}
                        />
                    </div>
                    <div className="column">
                        <Section
                            title="Featured In"
                            subtitle="March 2017 Issue of Homes and Houses"
                            fluid={true}
                        />
                    </div>
                </section>
            </section>
        );
    }
}

export default Miller;
