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
        //CommonModule.actions.publish
        const { mission, achievements } = this.props;
        const markup = ReactDOMServer.renderToStaticMarkup(
            <Preview mission={mission} achievements={achievements} />
        );
        console.log(markup);
        CommonModule.actions.publish({ mission, achievements }, markup);
    }

    onCancel() {
        this.props.history.push("/app");
    }

    render() {
        const { mission, achievements } = this.props;

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
                <Preview mission={mission} achievements={achievements} />
            </Page>
        );
    }
}

function mapStateToProps(props) {
    return {
        mission: CommonModule.getters.mission,
        achievements: CommonModule.getters.achievements
    };
}

const ConnectedContainer = connect(mapStateToProps)(PreviewContainer);
export default ConnectedContainer;
