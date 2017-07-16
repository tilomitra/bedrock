import React, { Component } from "react";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import {
    Page,
    Card,
    Button,
    Stack,
    Heading,
    EmptyState,
    DisplayText
} from "@shopify/polaris";
import { Link } from "react-router-dom";
import "@shopify/polaris/styles.css";

import LinkCard from "../components/link-card";

class HomeContainer extends Component {
    render() {
        return (
            <Page title="Home">
                <LinkCard
                    title={"Mission and Tagline"}
                    url={`/app/mission`}
                    buttonTitle={"Provide Mission and Tagline"}
                    description={
                        <p>Specify your brand's mission and tagline.</p>
                    }
                />

                <LinkCard
                    title={"Achievements"}
                    url={`/app/achievements`}
                    buttonTitle={"List Achievements"}
                    description={
                        <p>
                            Highlight notable achievements, blog posts, media
                            coverage and more.
                        </p>
                    }
                />

                <LinkCard
                    title={"Milestones"}
                    url={`/app/milestones`}
                    buttonTitle={"List Milestones"}
                    description={
                        <p>
                            Highlight impressive numbers, sales targets, or
                            customer ratings.
                        </p>
                    }
                />

                <LinkCard
                    title={"Team Members"}
                    url={`/app/team`}
                    buttonTitle={"Add Team Members"}
                    description={<p>Highlight your executive team.</p>}
                />

                <LinkCard
                    title={"Gallery"}
                    url={`/app/gallery`}
                    buttonTitle={"Add Images"}
                    description={
                        <p>
                            Add featured images that highlight your products and
                            brand.
                        </p>
                    }
                />

                <LinkCard
                    title={"About your Store"}
                    url={`/app/about`}
                    buttonTitle={"Write About your Brand"}
                    description={
                        <p>
                            Tell a story about your brand so customers can learn
                            about what you are passionate about.
                        </p>
                    }
                />

                <div
                    className="has-text-center"
                    style={{ marginTop: 30, marginBottom: 30 }}
                >
                    <DisplayText size="large">Display Options</DisplayText>
                    <p>
                        You've added your content. Now let's make sure your
                        Press Kit looks good!
                    </p>
                </div>

                <LinkCard
                    title={"Preview and Publish"}
                    url={`/app/preview`}
                    buttonTitle={"Customize and Publish"}
                    description={
                        <p>
                            Choose your theme, preview your Press Kit and
                            publish it to your store.
                        </p>
                    }
                />
            </Page>
        );
    }
}

export default HomeContainer;
