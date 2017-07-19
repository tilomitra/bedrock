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
import TeamPreview from "./templates/components/team";

class EditLink extends Component {
    render() {
        let contents = (
            <div className="has-text-center" style={{ marginTop: "1em" }}>
                <Link to={this.props.url}>
                    <Button slim>
                        {this.props.title}
                    </Button>
                </Link>
            </div>
        );
        if (this.props.showHeader) {
            return (
                <section>
                    <Header
                        title={this.props.header}
                        color={this.props.color}
                    />
                    {contents}
                </section>
            );
        } else {
            return contents;
        }
    }
}

class Preview extends Component {
    render() {
        const {
            mission,
            achievements,
            milestones,
            about,
            gallery,
            team,
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

        const teamJsx = team.map((v, idx) => {
            const props = v.toJS();
            return <TeamPreview key={`team-${idx}`} {...props} color={color} />;
        });

        return (
            <section className="pk-wrapper">
                <style dangerouslySetInnerHTML={{ __html: this.props.css }} />

                {mission.size
                    ? <MissionPreview
                          title={mission.get("title")}
                          subtitle={mission.get("tagline")}
                          color={color}
                      />
                    : null}

                {this.props.showEditLinks
                    ? <EditLink
                          color={color}
                          url={`/app/mission`}
                          title={"Edit Mission and Tagline"}
                          header="Mission"
                          showHeader={!!!mission.size}
                      />
                    : null}

                {about.get("html").length
                    ? <section>
                          <Header title="About" color={color} />
                          <AboutPreview
                              content={about.get("html")}
                              color={color}
                          />
                      </section>
                    : null}

                {this.props.showEditLinks
                    ? <EditLink
                          color={color}
                          url={`/app/about`}
                          title={"Edit About Contents"}
                          header="About"
                          showHeader={!!!about.get("html").length}
                      />
                    : null}

                {achievementJsx.size
                    ? <section>
                          <Header
                              title="Achievements and Awards"
                              color={color}
                          />
                          <div className="columns is-multiline">
                              {achievementJsx}
                          </div>
                      </section>
                    : null}

                {this.props.showEditLinks
                    ? <EditLink
                          color={color}
                          url={`/app/achievements`}
                          title={"Update Achievements"}
                          header="Achievements"
                          showHeader={!!!achievementJsx.size}
                      />
                    : null}

                {teamJsx.size
                    ? <section>
                          <Header title="Team" color={color} />
                          {teamJsx}
                      </section>
                    : null}

                {this.props.showEditLinks
                    ? <EditLink
                          color={color}
                          url={`/app/team`}
                          title={"Update Team Members"}
                          header="Team"
                          showHeader={!!!teamJsx.size}
                      />
                    : null}

                {gallery.size
                    ? <section>
                          <Header title="Gallery" color={color} />
                          <GalleryPreview images={gallery.toJS()} />
                      </section>
                    : null}

                {this.props.showEditLinks
                    ? <EditLink
                          color={color}
                          url={`/app/gallery`}
                          title={"Update Gallery"}
                          header="Gallery"
                          showHeader={!!!gallery.size}
                      />
                    : null}

                {milestoneJsx.size
                    ? <section>
                          <Header title="Milestones" color={color} />
                          <div className="columns is-multiline">
                              {milestoneJsx}
                          </div>
                      </section>
                    : null}

                {this.props.showEditLinks
                    ? <EditLink
                          color={color}
                          url={`/app/milestones`}
                          header="Milestones"
                          title={"Update Milestones"}
                          showHeader={!!!milestoneJsx.size}
                      />
                    : null}
            </section>
        );
    }
}

export default Preview;
