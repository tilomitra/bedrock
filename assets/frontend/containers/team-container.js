import React, { Component } from "react";
import { Page, Card, Button, FormLayout, TextField } from "@shopify/polaris";

import { connect } from "nuclear-js-react-addons";
import CommonModule from "../modules/common";
import Team from "../components/team";

class TeamContainer extends Component {
    componentDidMount() {
        CommonModule.actions.fetchEntity("teams");
    }
    onAddTeam(val) {
        CommonModule.actions.addTeam();
    }

    onRemoveTeam(idx) {
        CommonModule.actions.removeTeam(idx);
    }

    onUpdateTeam(idx, attr, value) {
        CommonModule.actions.updateTeam(idx, attr, value);
    }

    onSave(e) {
        CommonModule.actions.saveEntity("teams", this.props.team.toJS());
        this.props.history.push("/app/build");
    }

    onCancel(e) {
        this.props.history.push("/app/build");
    }

    render() {
        return (
            <Team
                members={this.props.team}
                onAdd={this.onAddTeam.bind(this)}
                onRemove={this.onRemoveTeam.bind(this)}
                onUpdate={this.onUpdateTeam.bind(this)}
                onSave={this.onSave.bind(this)}
                onCancel={this.onCancel.bind(this)}
            />
        );
    }
}

function mapStateToProps(props) {
    return {
        team: CommonModule.getters.team
    };
}

const ConnectedContainer = connect(mapStateToProps)(TeamContainer);
export default ConnectedContainer;
