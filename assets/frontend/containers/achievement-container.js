import React, { Component } from "react";
import { Page, Card, Button, FormLayout, TextField } from "@shopify/polaris";

import { connect } from "nuclear-js-react-addons";
import CommonModule from "../modules/common";
import Achievements from "../components/achievements";

class AchievementContainer extends Component {
    componentDidMount() {
        CommonModule.actions.fetchEntity("achievements");
    }

    onAddAchievement(val) {
        CommonModule.actions.addAchievement();
    }

    onRemoveAchievement(idx) {
        CommonModule.actions.removeAchievement(idx);
    }

    onUpdateAchievement(idx, attr, value) {
        CommonModule.actions.updateAchievement(idx, attr, value);
    }

    onSave(e) {
        CommonModule.actions.saveEntity(
            "achievements",
            this.props.achievements.toJS()
        );

        this.props.history.push("/app/build");
    }

    onCancel(e) {
        this.props.history.push("/app/build");
    }

    render() {
        return (
            <Achievements
                achievements={this.props.achievements}
                onAdd={this.onAddAchievement.bind(this)}
                onRemove={this.onRemoveAchievement.bind(this)}
                onUpdate={this.onUpdateAchievement.bind(this)}
                onSave={this.onSave.bind(this)}
                onCancel={this.onCancel.bind(this)}
            />
        );
    }
}

function mapStateToProps(props) {
    return {
        achievements: CommonModule.getters.achievements
    };
}

const ConnectedAchievementContainer = connect(mapStateToProps)(
    AchievementContainer
);
export default ConnectedAchievementContainer;
