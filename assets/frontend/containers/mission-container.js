import React, { Component } from "react";
import { Page, Card, Button, FormLayout, TextField } from "@shopify/polaris";

import { connect } from "nuclear-js-react-addons";
import CommonModule from "../modules/common";
import Mission from "../components/mission";

class MissionContainer extends Component {
    onMissionChange(val) {
        CommonModule.actions.updateMission(val);
    }

    onTaglineChange(val) {
        CommonModule.actions.updateTagline(val);
    }

    onSave(e) {}

    onCancel(e) {
        this.props.history.push("/app");
    }

    render() {
        return (
            <Mission
                title={this.props.mission.get("title")}
                tagline={this.props.mission.get("tagline")}
                onMissionChange={this.onMissionChange.bind(this)}
                onTaglineChange={this.onTaglineChange.bind(this)}
                onSave={this.onSave.bind.bind(this)}
                onCancel={this.onCancel.bind(this)}
            />
        );
    }
}

function mapStateToProps(props) {
    return {
        mission: CommonModule.getters.mission
    };
}

const ConnectedMissionContainer = connect(mapStateToProps)(MissionContainer);
export default ConnectedMissionContainer;
