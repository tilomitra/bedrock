import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import { connect } from "nuclear-js-react-addons";
import {
    Page,
    Card,
    Button,
    Stack,
    PageActions,
    Header
} from "@shopify/polaris";
import { Link } from "react-router-dom";
import "@shopify/polaris/styles.css";

import CommonModule from "../modules/common";
import Preview from "../components/preview";

class PreviewContainer extends Component {
    onPublish() {
        const markup = ReactDOMServer.renderToStaticMarkup(
            <Preview {...this.props} />
        );
        CommonModule.actions.publish(this.props, markup);
    }

    onCancel() {
        this.props.history.push("/app");
    }

    render() {
        return (
            <Page title="Preview">
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
                <hr />
                <Preview {...this.props} />
            </Page>
        );
    }
}

function mapStateToProps(props) {
    return {
        about: CommonModule.getters.about,
        mission: CommonModule.getters.mission,
        achievements: CommonModule.getters.achievements,
        milestones: CommonModule.getters.milestones
    };
}

const ConnectedContainer = connect(mapStateToProps)(PreviewContainer);
export default ConnectedContainer;
