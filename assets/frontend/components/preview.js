import React, { Component } from "react";
import { Page, Card, Button, Stack } from "@shopify/polaris";
import { Link } from "react-router-dom";
import "@shopify/polaris/styles.css";

import config from "../config";

import AboutPreview from "./templates/components/about";
import MissionPreview from "./templates/components/mission";
import AchievementPreview from "./templates/components/achievement";
import MilestonePreview from "./templates/components/milestone";

class Preview extends Component {
    render() {
        const { mission, achievements, milestones, about } = this.props;

        const achievementJsx = achievements.map((v, idx) => {
            const props = v.toJS();
            return <AchievementPreview key={`ach-${idx}`} {...props} />;
        });

        const milestoneJsx = milestones.map((v, idx) => {
            const props = v.toJS();
            return <MilestonePreview key={`ms-${idx}`} {...props} />;
        });

        return (
            <section className="pk-wrapper">
                <MissionPreview
                    title={mission.get("title")}
                    subtitle={mission.get("tagline")}
                />

                <h2 className="pk-header">About</h2>
                <AboutPreview content={about.get("html")} />

                <h2 className="pk-header">Achievements and Awards</h2>
                <div className="columns is-multiline">
                    {achievementJsx}
                </div>

                <h2 className="pk-header">Milestones</h2>
                <div className="columns is-multiline">
                    {milestoneJsx}
                </div>
            </section>
        );
    }
}

export default Preview;
