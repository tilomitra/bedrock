import React, { Component } from "react";
import { EmbeddedApp } from "@shopify/polaris/embedded";
import {
    Page,
    Card,
    PageActions,
    EmptyState,
    FormLayout,
    TextField,
    List
} from "@shopify/polaris";
import { Link } from "react-router-dom";
import "@shopify/polaris/styles.css";

class HomeContainer extends Component {
    onBuild() {
        this.props.history.push("/app/build");
    }
    render() {
        return (
            <Page title="Home">
                <EmptyState
                    heading="Welcome to Press Kitty"
                    action={{
                        content: "Build your Press Kit",
                        onClick: () => {
                            this.props.history.push("/app/build");
                        }
                    }}
                    secondaryAction={{
                        content: "Learn more",
                        url: "https://help.shopify.com"
                    }}
                    image="images/cat/hi.svg"
                >
                    <p>
                        Start building your press kit by adding various
                        sections.
                    </p>
                </EmptyState>

                <Card title="Updates">
                    <Card.Section>
                        We continuously add features to Press Kitty. We'll list
                        new features here so you can know about them and try
                        them out.
                    </Card.Section>
                    <Card.Section>
                        <List type="bullet">
                            <List.Item>
                                Version 1 Released! Build your Press Kit and
                                publish it to your Shopify Store as a Page.
                            </List.Item>
                            <List.Item>
                                Let us know in the Feedback section what
                                features you would like us to add next.
                            </List.Item>
                        </List>
                    </Card.Section>
                </Card>
                <Card
                    title="Give Feedback"
                    primaryFooterAction={{ content: "Send" }}
                >
                    <Card.Section>
                        We love hearing from you! Let us know what features you
                        are looking for, and we'll do our best to add them to
                        Press Kitty.
                    </Card.Section>
                    <Card.Section>
                        <FormLayout>
                            <TextField label="Store name" />
                            <TextField type="email" label="Your email" />
                            <TextField label="Your Feedback" multiline={true} />
                        </FormLayout>
                    </Card.Section>
                </Card>

                <Card title="Learn More">
                    <Card.Section>
                        Here are some guides to help you get started easily.
                    </Card.Section>
                </Card>

                <PageActions
                    primaryAction={{
                        content: "Build your Press Kit",
                        onClick: this.onBuild.bind(this)
                    }}
                />
            </Page>
        );
    }
}

export default HomeContainer;
