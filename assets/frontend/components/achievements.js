import React, { Component } from "react";
import {
    Page,
    Card,
    Button,
    FormLayout,
    TextField,
    PageActions,
    ChoiceList
} from "@shopify/polaris";

import RenderedAchievement from "./templates/components/achievement";

class Achievement extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(idx, attr, value) {
        this.props.onUpdate(idx, attr, value);
    }

    render() {
        const achievementFormJsx = this.props.achievements.map((v, idx) => {
            return (
                <Card
                    title={v.get("name")}
                    key={`ach-card-${idx}`}
                    secondaryFooterAction={{
                        content: "Delete",
                        onClick: () => {
                            this.props.onRemove(idx);
                        }
                    }}
                >
                    <Card.Section>
                        <FormLayout>
                            <TextField
                                label="Name"
                                value={v.get("name")}
                                onChange={val => {
                                    this.handleChange(idx, "name", val);
                                }}
                            />
                            <FormLayout.Group>
                                <TextField
                                    label="Publication Name"
                                    value={v.get("publicationName")}
                                    onChange={val => {
                                        this.handleChange(
                                            idx,
                                            "publicationName",
                                            val
                                        );
                                    }}
                                />
                                <TextField
                                    label="Link to Publication"
                                    value={v.get("publishLink")}
                                    onChange={val => {
                                        this.handleChange(
                                            idx,
                                            "publishLink",
                                            val
                                        );
                                    }}
                                />
                            </FormLayout.Group>

                            <FormLayout.Group>
                                <TextField
                                    label="Image URL"
                                    value={v.get("imageUrl")}
                                    onChange={val => {
                                        this.handleChange(idx, "imageUrl", val);
                                    }}
                                />
                                <ChoiceList
                                    title="Type of Achievement"
                                    choices={[
                                        {
                                            label: "Award",
                                            value: "award"
                                        },
                                        {
                                            label: "Blog Post",
                                            value: "post"
                                        },
                                        {
                                            label: "Featured",
                                            value: "feature"
                                        }
                                    ]}
                                    selected={[v.get("type")]}
                                    onChange={val => {
                                        this.handleChange(idx, "type", val[0]);
                                    }}
                                />
                            </FormLayout.Group>
                        </FormLayout>
                    </Card.Section>
                </Card>
            );
        });

        const renderedJsx = this.props.achievements.map((v, idx) => {
            let props = v.toJS();
            return <RenderedAchievement {...props} />;
        });

        return (
            <Page title="Achievements">
                {achievementFormJsx}

                <Card title={"Preview"}>
                    <Card.Section>
                        <p>
                            Your achievements show up in a grid. Here's a
                            preview of your current achievements.
                        </p>
                        <hr />
                        <div className="columns is-multiline">
                            {renderedJsx}
                        </div>
                    </Card.Section>
                </Card>
                <PageActions
                    primaryAction={{
                        content: "Save",
                        onClick: this.props.onSave
                    }}
                    secondaryActions={[
                        {
                            content: "Cancel",
                            onClick: this.props.onCancel
                        },
                        {
                            content: "Add New Achievement",
                            onClick: this.props.onAdd
                        }
                    ]}
                />
            </Page>
        );
    }
}

export default Achievement;
