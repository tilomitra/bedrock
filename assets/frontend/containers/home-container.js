import React, { Component } from "react";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import { Page, Card, Button, Stack, Subheading } from "@shopify/polaris";
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
                    <Card>
                        <Card.Section>
                            <Stack alignment="center">
                                <Stack.Item fill>
                                    <p>
                                        <strong>Mission and Tagline: </strong>{" "}
                                        Specify your brand's mission and
                                        tagline.
                                    </p>
                                </Stack.Item>
                                <Stack.Item>
                                    <Link to={`/app/mission`}>
                                        <Button>
                                            Provide Mission and Tagline
                                        </Button>
                                    </Link>
                                </Stack.Item>
                            </Stack>
                        </Card.Section>
                    </Card>
                    <Card>
                        <Card.Section>
                            <Stack alignment="center">
                                <Stack.Item fill>
                                    <p>
                                        <strong>Achievements: </strong>{" "}
                                        Highlight notable achievements, blog
                                        posts, media coverage and more.
                                    </p>
                                </Stack.Item>
                                <Stack.Item>
                                    <Link to={`/app/achievements`}>
                                        <Button>List Achievements</Button>
                                    </Link>
                                </Stack.Item>
                            </Stack>
                        </Card.Section>
                    </Card>
                    <Card>
                        <Card.Section>
                            <Stack alignment="center">
                                <Stack.Item fill>
                                    <p>
                                        <strong>Preview and Publish: </strong>{" "}
                                        Preview your final press kit and publish
                                        it to your store.
                                    </p>
                                </Stack.Item>
                                <Stack.Item>
                                    <Link to={`/app/preview`}>
                                        <Button>Preview</Button>
                                    </Link>
                                </Stack.Item>
                            </Stack>
                        </Card.Section>
                    </Card>
                    <Card
                        title="About the Brand"
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
