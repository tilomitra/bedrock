import React, { Component } from "react";
import { Page, Card, Button, Stack } from "@shopify/polaris";
import { Link } from "react-router-dom";
import "@shopify/polaris/styles.css";

import config from "../config";

import Header from "./templates/bulma/header";
import AboutPreview from "./templates/components/about";
import MissionPreview from "./templates/components/mission";
import AchievementPreview from "./templates/components/achievement";
import MilestonePreview from "./templates/components/milestone";
import GalleryPreview from "./templates/components/gallery";

class Preview extends Component {
    render() {
        const {
            mission,
            achievements,
            milestones,
            about,
            gallery,
            color
        } = this.props;

        const achievementJsx = achievements.map((v, idx) => {
            const props = v.toJS();
            return (
                <AchievementPreview
                    key={`ach-${idx}`}
                    {...props}
                    color={color}
                />
            );
        });

        const milestoneJsx = milestones.map((v, idx) => {
            const props = v.toJS();
            return (
                <MilestonePreview key={`ms-${idx}`} {...props} color={color} />
            );
        });

        return (
            <section className="pk-wrapper">
                <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

                <MissionPreview
                    title={mission.get("title")}
                    subtitle={mission.get("tagline")}
                    color={color}
                />

                <Header title="About" color={color} />

                <AboutPreview content={about.get("html")} color={color} />

                <Header title="Achievements and Awards" color={color} />
                <div className="columns is-multiline">
                    {achievementJsx}
                </div>

                <Header title="Featured Images" color={color} />
                <GalleryPreview images={gallery.toJS()} />

                <Header title="Milestones" color={color} />
                <div className="columns is-multiline">
                    {milestoneJsx}
                </div>
            </section>
        );
    }
}

export default Preview;
