import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import { connect } from "nuclear-js-react-addons";
import {
    Page,
    Card,
    Button,
    Stack,
    PageActions,
    DisplayText
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
                breadcrumbs={[
                    { content: "Settings", onClick: this.onCancel.bind(this) }
                ]}
                primaryAction={{
                    content: "Publish",
                    onClick: this.onPublish.bind(this)
                }}
            >
                <Card title="Choose Accent Color">
                    <Card.Section>
                        <p>
                            Choose an accent color that matches your store's
                            overall theme. This color will be used in your Press
                            Kit. Once you choose a color, you can preview your
                            results below.
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

                <Card>
                    <Preview
                        color={this.state.accentColor}
                        css={this.state.css}
                        {...this.props}
                    />
                </Card>

                <PageActions
                    primaryAction={{
                        content: "Publish",
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
        gallery: CommonModule.getters.gallery
    };
}

const ConnectedContainer = connect(mapStateToProps)(PreviewContainer);
export default ConnectedContainer;
