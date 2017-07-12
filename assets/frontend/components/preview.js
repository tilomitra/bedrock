import React, { Component } from "react";
import { Page, Card, Button, Stack } from "@shopify/polaris";
import { Link } from "react-router-dom";
import "@shopify/polaris/styles.css";

import config from "../config";

import MissionPreview from "../components/templates/components/mission";
import AchievementPreview from "../components/templates/components/achievement";

class Preview extends Component {
    render() {
        const { mission, achievements } = this.props;

        const achievementJsx = achievements.map((v, idx) => {
            const props = v.toJS();
            return <AchievementPreview key={`ach-${idx}`} {...props} />;
        });

        return (
            <section>
                <MissionPreview
                    title={mission.get("title")}
                    subtitle={mission.get("tagline")}
                />

                <div className="columns is-multiline">
                    {achievementJsx}
                </div>
            </section>
        );
    }
}

export default Preview;
