import React, { Component } from "react";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import { Page, Card, Button } from "@shopify/polaris";
import { Link } from "react-router-dom";
import "@shopify/polaris/styles.css";

import config from "../config";

const shopOrigin = "https://miller-furniture.myshopify.com";
const secret = "43c92a66f5a5f02efbdead64b384c084";

class HomeContainer extends Component {
    render() {
        return (
            <EmbeddedApp
                shopOrigin={shopOrigin}
                apiKey={config.apiKey}
                debug={true}
            >
                <Page title="Press Kitty">
                    <Card title="Mission and Tagline">
                        <Card.Section>
                            <p>Specify your brand's mission and tagline.</p>
                            <Link to={`/app/mission`}>
                                <Button>View Details</Button>
                            </Link>
                        </Card.Section>
                    </Card>
                    <Card title="About">
                        <Card.Section>
                            <p>Tell your customers a bit about your store.</p>
                            <Link to={`/app/achievements`}>
                                <Button>View Details</Button>
                            </Link>
                        </Card.Section>
                    </Card>
                    <Card
                        title="Awards and Acknowledgements"
                        actions={{ content: "View Details" }}
                    >
                        <Card.Section>
                            <p>
                                Highlight any awards, acknowledgements, or press
                                coverage that you have received.
                            </p>
                        </Card.Section>
                    </Card>
                </Page>
            </EmbeddedApp>
        );
    }
}

export default HomeContainer;
