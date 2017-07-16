import React, { Component } from "react";
import { Page, Card, Button, FormLayout, TextField } from "@shopify/polaris";

import { connect } from "nuclear-js-react-addons";
import CommonModule from "../modules/common";
import About from "../components/about";

class AboutContainer extends Component {
    componentDidMount() {
        CommonModule.actions.fetchEntity("abouts");
    }

    onSave() {
        CommonModule.actions.saveEntity("abouts", {
            html: this.props.about.get("html")
        });
        this.props.history.push("/app");
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
                onSave={this.onSave.bind(this)}
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
