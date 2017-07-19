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
    EmptyState
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
            css: "",
            isPublishing: false
        };
    }

    componentWillMount() {
        CommonModule.actions.fetchEntity("missions");
        CommonModule.actions.fetchEntity("achievements");
        CommonModule.actions.fetchEntity("milestones");
        CommonModule.actions.fetchEntity("teams");
        CommonModule.actions.fetchEntity("images");
        CommonModule.actions.fetchEntity("abouts");
    }

    componentDidMount() {
        window.scroll(0, 0);
    }

    onPublish() {
        this.setState({ isPublishing: true });
        const markup = ReactDOMServer.renderToStaticMarkup(
            <Preview
                {...this.props}
                color={this.state.accentColor}
                css={this.state.css}
                showEditLinks={false}
            />
        );
        console.log(markup);
        CommonModule.actions.publish(this.props, markup, this.state.css);
    }

    onCancel() {
        this.props.history.push("/app/build");
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
        let footerBanner;
        const defaultTopBanner = (
            <Banner title="Let's start building your Press Kit." status="info">
                <p>
                    Here's a preview of your Press Kit. Make changes to it, and
                    click Publish once you are ready to add it to your store.
                </p>
            </Banner>
        );
        let topBanner;

        let isPublishedAndSaved =
            this.props.general.get("publishedPage") &&
            this.props.general.get("isSaved");
        let hasUnsavedChanges = !this.props.general.get("isSaved");

        if (isPublishedAndSaved) {
            let handle = this.props.general.getIn([
                "publishedPage",
                "page",
                "handle"
            ]);
            footerBanner = (
                <Banner
                    title="Your Press Kit was successfully published to your store."
                    status="success"
                    action={{
                        content: "View Page",
                        url: `https://${App.Store.name}/pages/${handle}`
                    }}
                >
                    <p>
                        Your published press kit may look a little different
                        because it will adopt your store's style. Here's a link
                        to it:
                        <a
                            href={`https://${App.Store.name}/pages/${handle}`}
                        >{`https://${App.Store.name}/pages/${handle}`}</a>
                    </p>
                </Banner>
            );
            topBanner = defaultTopBanner;
        } else if (this.state.isPublishing) {
            footerBanner = (
                <Banner
                    title="Your Press Kit is being published. Give us a few seconds."
                    status="info"
                />
            );
            topBanner = defaultTopBanner;
        } else if (hasUnsavedChanges) {
            topBanner = (
                <Banner
                    title="Your Press Kit has unsaved changes. Make sure to Save and Publish before leaving the page."
                    status="warning"
                />
            );
            footerBanner = topBanner;
        }

        return (
            <Page
                title="Build"
                primaryAction={{
                    content: "Save and Publish",
                    onClick: this.onPublish.bind(this)
                }}
            >
                <Card>
                    {topBanner}
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

                {footerBanner}

                <PageActions
                    primaryAction={{
                        content: "Save and Publish this Press Kit",
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
        team: CommonModule.getters.team,
        general: CommonModule.getters.general
    };
}

const ConnectedContainer = connect(mapStateToProps)(PreviewContainer);
export default ConnectedContainer;
