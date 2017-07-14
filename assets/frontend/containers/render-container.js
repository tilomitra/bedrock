import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import { connect } from "nuclear-js-react-addons";
import {
    Page,
    Card,
    Button,
    Stack,
    PageActions,
    CalloutCard,
    Banner,
    DisplayText,
    Subheading,
    Popover
} from "@shopify/polaris";
import ColorPicker from "../components/colorpicker";
import CSSEditor from "../components/css-editor";

import { Link } from "react-router-dom";
import "@shopify/polaris/styles.css";

import CommonModule from "../modules/common";
import Preview from "../components/preview";

class PreviewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accentColor: "#7fac63",
            css: ""
        };
    }
    onPublish() {
        const markup = ReactDOMServer.renderToStaticMarkup(
            <Preview {...this.props} />
        );
        CommonModule.actions.publish(this.props, markup, this.state.css);
    }

    onCancel() {
        this.props.history.push("/app");
    }

    onColorChange(color) {
        this.setState({
            accentColor: color.hex
        });
    }

    onCodeChange(codeVal) {
        this.setState({
            css: codeVal
        });
    }

    render() {
        return (
            <Page
                title="Preview"
                breadcrumbs={[{ content: "Settings", url: "/" }]}
                primaryAction={{
                    content: "Publish",
                    onClick: this.onPublish.bind(this)
                }}
            >
                <Card>
                    <Banner title="Build your Press Kit." status="info">
                        <p>
                            To make things easy, we've set you up with a sample
                            Press Kit below.
                        </p>
                        <p>
                            Edit the contents of each section to make this Press
                            Kit your own. Once you are satisfied, click the
                            Publish button to add it to your store.
                        </p>
                    </Banner>
                </Card>

                <Card>
                    <Preview
                        color={this.state.accentColor}
                        css={this.state.css}
                        {...this.props}
                        showEditLinks={true}
                    />
                </Card>

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

                <Card title="Choose Theme">
                    <Card.Section>
                        <p>
                            The current theme for your Press Kit is{" "}
                            <strong>Miller</strong>.
                        </p>
                        <p>
                            New themes are still under development. You will be
                            notified via email when they are released.
                        </p>
                        <Button disabled style={{ marginTop: 20 }}>
                            Switch Themes
                        </Button>
                    </Card.Section>
                </Card>

                <Card title="Choose Accent Color">
                    <Card.Section>
                        <p>
                            Choose an accent color that matches your store's
                            overall theme. Once you choose a color, the Press
                            Kit Preview above will reflect your changes.
                        </p>

                        <div
                            className="has-text-center"
                            style={{ marginTop: 20 }}
                        >
                            <ColorPicker
                                onChange={this.onColorChange.bind(this)}
                            />
                        </div>
                    </Card.Section>
                </Card>

                <CSSEditor onChange={this.onCodeChange.bind(this)} />

                <PageActions
                    primaryAction={{
                        content: "Publish to Store",
                        onClick: this.onPublish.bind(this)
                    }}
                    secondaryActions={[
                        {
                            content: "Cancel",
                            onClick: this.onCancel.bind(this)
                        }
                    ]}
                />
            </Page>
        );
    }
}

function mapStateToProps(props) {
    return {
        about: CommonModule.getters.about,
        mission: CommonModule.getters.mission,
        achievements: CommonModule.getters.achievements,
        milestones: CommonModule.getters.milestones,
        gallery: CommonModule.getters.gallery,
        team: CommonModule.getters.team
    };
}

const ConnectedContainer = connect(mapStateToProps)(PreviewContainer);
export default ConnectedContainer;
