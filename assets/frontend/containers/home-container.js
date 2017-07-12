import React, { Component } from "react";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import { Page, Card, Button, Stack, Header } from "@shopify/polaris";
import { Link } from "react-router-dom";
import "@shopify/polaris/styles.css";

import LinkCard from "../components/link-card";

class HomeContainer extends Component {
    render() {
        return (
            <Page title="Home">
                <LinkCard
                    url={`/app/mission`}
                    buttonTitle={"Provide Mission and Tagline"}
                    description={
                        <p>
                            <strong>Mission and Tagline: </strong> Specify your
                            brand's mission and tagline.
                        </p>
                    }
                />

                <LinkCard
                    url={`/app/achievements`}
                    buttonTitle={"List Achievements"}
                    description={
                        <p>
                            <strong>Achievements: </strong> Highlight notable
                            achievements, blog posts, media coverage and more.
                        </p>
                    }
                />

                <LinkCard
                    url={`/app/milestones`}
                    buttonTitle={"List Milestones"}
                    description={
                        <p>
                            <strong>Milestones: </strong> Highlight impressive
                            numbers, sales targets, or customer ratings.
                        </p>
                    }
                />

                <LinkCard
                    url={`/app/preview`}
                    buttonTitle={"Preview and Publish"}
                    description={
                        <p>
                            <strong>Preview and Publish: </strong> Preview your
                            final press kit and publish it to your store.
                        </p>
                    }
                />
            </Page>
        );
    }
}

export default HomeContainer;
