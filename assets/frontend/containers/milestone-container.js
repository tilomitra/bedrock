import React, { Component } from "react";
import { Page, Card, Button, FormLayout, TextField } from "@shopify/polaris";

import { connect } from "nuclear-js-react-addons";
import CommonModule from "../modules/common";
import Milestones from "../components/milestones";

class MilestoneContainer extends Component {
    onAddMilestone(val) {
        CommonModule.actions.addMilestone();
    }

    onRemoveMilestone(idx) {
        CommonModule.actions.removeMilestone(idx);
    }

    onUpdateMilestone(idx, attr, value) {
        CommonModule.actions.updateMilestone(idx, attr, value);
    }

    onSave(e) {}

    onCancel(e) {
        this.props.history.push("/app");
    }

    render() {
        return (
            <Milestones
                milestones={this.props.milestones}
                onAdd={this.onAddMilestone.bind(this)}
                onRemove={this.onRemoveMilestone.bind(this)}
                onUpdate={this.onUpdateMilestone.bind(this)}
                onSave={this.onSave.bind.bind(this)}
                onCancel={this.onCancel.bind(this)}
            />
        );
    }
}

function mapStateToProps(props) {
    return {
        milestones: CommonModule.getters.milestones
    };
}

const ConnectedContainer = connect(mapStateToProps)(MilestoneContainer);
export default ConnectedContainer;
