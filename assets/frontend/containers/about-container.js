import React, { Component } from "react";
import { Page, Card, Button, FormLayout, TextField } from "@shopify/polaris";

import { connect } from "nuclear-js-react-addons";
import CommonModule from "../modules/common";
import About from "../components/about";

class AboutContainer extends Component {
    onSave(htmlText) {
        console.log(htmlText);
    }

    onCancel(e) {
        this.props.history.push("/app");
    }

    onUpdate(html) {
        CommonModule.actions.updateAbout(html);
    }

    render() {
        return (
            <About
                content={this.props.about}
                onUpdate={this.onUpdate.bind(this)}
                onSave={this.onSave.bind.bind(this)}
                onCancel={this.onCancel.bind(this)}
            />
        );
    }
}

function mapStateToProps(props) {
    return {
        about: CommonModule.getters.about
    };
}

const ConnectedAboutContainer = connect(mapStateToProps)(AboutContainer);
export default ConnectedAboutContainer;
