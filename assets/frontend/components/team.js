import React, { Component } from "react";
import {
    Page,
    Card,
    Button,
    FormLayout,
    TextField,
    PageActions
} from "@shopify/polaris";

import RenderedTeam from "./templates/components/team";

class Milestone extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(idx, attr, value) {
        this.props.onUpdate(idx, attr, value);
    }

    render() {
        const formJsx = this.props.members.map((v, idx) => {
            return (
                <Card
                    title={v.get("name")}
                    key={`team-card-${idx}`}
                    secondaryFooterAction={{
                        content: "Delete",
                        onClick: () => {
                            this.props.onRemove(idx);
                        }
                    }}
                >
                    <Card.Section>
                        <FormLayout>
                            <FormLayout.Group>
                                <TextField
                                    label="Name"
                                    type="text"
                                    value={v.get("name")}
                                    onChange={val => {
                                        this.handleChange(idx, "name", val);
                                    }}
                                />

                                <TextField
                                    label="Position"
                                    value={v.get("position")}
                                    onChange={val => {
                                        this.handleChange(idx, "position", val);
                                    }}
                                />
                            </FormLayout.Group>

                            <FormLayout.Group>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={v.get("email")}
                                    onChange={val => {
                                        this.handleChange(idx, "email", val);
                                    }}
                                />
                                <TextField
                                    label="Image URL"
                                    type="text"
                                    value={v.get("imageUrl")}
                                    onChange={val => {
                                        this.handleChange(idx, "imageUrl", val);
                                    }}
                                />
                            </FormLayout.Group>

                            <TextField
                                label="Description"
                                type="text"
                                multiline={true}
                                spellCheck={true}
                                value={v.get("description")}
                                onChange={val => {
                                    this.handleChange(idx, "description", val);
                                }}
                            />
                        </FormLayout>
                    </Card.Section>
                </Card>
            );
        });

        const renderedJsx = this.props.members.map((v, idx) => {
            let props = v.toJS();
            return <RenderedTeam {...props} />;
        });

        return (
            <Page title="Team Members">
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
                            content: "Add New Team Member",
                            onClick: this.props.onAdd
                        }
                    ]}
                />

                {formJsx}

                <Card title={"Preview"}>
                    <Card.Section>
                        <p>
                            Your team members show up in a grid. Here's a
                            preview of your current team members.
                        </p>
                        <hr />
                        {renderedJsx}
                    </Card.Section>
                </Card>
            </Page>
        );
    }
}

export default Milestone;
