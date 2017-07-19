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
        let publishedPageBanner;
        if (this.props.general.get("publishedPage")) {
            let handle = this.props.general.getIn([
                "publishedPage",
                "page",
                "handle"
            ]);
            publishedPageBanner = (
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
                        because it will adopt your store's style.
                    </p>
                </Banner>
            );
        } else if (this.state.isPublishing) {
            publishedPageBanner = (
                <Banner
                    title="Your Press Kit is being published. Give us a few seconds."
                    status="info"
                />
            );
        }

        return (
            <Page
                title="Preview"
                primaryAction={{
                    content: "Publish",
                    onClick: this.onPublish.bind(this)
                }}
            >
                <EmptyState
                    heading="Welcome to Press Kitty"
                    action={{
                        content: "Build your Press Kit",
                        onClick: () => {
                            this.props.history.push("/app/preview");
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
                <Card>
                    <Banner
                        title="Here's a Preview of your Press Kit"
                        status="info"
                    >
                        <p>
                            Here's a preview of your Press Kit. Make changes to
                            it, and click Publish once you are ready to add it
                            to your store.
                        </p>
                        <p>
                            Your published kit will look slightly different as
                            it will adopt the styles from your website.
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

                {publishedPageBanner}

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
        team: CommonModule.getters.team,
        general: CommonModule.getters.general
    };
}

const ConnectedContainer = connect(mapStateToProps)(PreviewContainer);
export default ConnectedContainer;
