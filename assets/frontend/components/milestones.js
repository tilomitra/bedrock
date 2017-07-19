import React, { Component } from "react";
import {
    Page,
    Card,
    Button,
    FormLayout,
    TextField,
    PageActions,
    ChoiceList,
    Checkbox
} from "@shopify/polaris";

import RenderedMilestone from "./templates/components/milestone";

class Milestone extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(idx, attr, value) {
        this.props.onUpdate(idx, attr, value);
    }

    render() {
        const milestoneFormJsx = this.props.milestones.map((v, idx) => {
            const isTypeStars = v.get("type") === "stars";

            return (
                <Card
                    title={v.get("description")}
                    key={`ms-card-${idx}`}
                    secondaryFooterAction={{
                        content: "Delete",
                        onClick: () => {
                            this.props.onRemove(idx);
                        }
                    }}
                >
                    <Card.Section>
                        <FormLayout>
                            <ChoiceList
                                title="Type of Milestone"
                                choices={[
                                    {
                                        label: "An impressive number",
                                        value: "count"
                                    },
                                    {
                                        label: "Stars",
                                        value: "stars"
                                    }
                                ]}
                                selected={[v.get("type")]}
                                onChange={val => {
                                    this.handleChange(idx, "type", val[0]);
                                }}
                            />

                            <FormLayout.Group>
                                <TextField
                                    label={isTypeStars ? "Stars" : "Number"}
                                    type="number"
                                    value={v.get("amount")}
                                    min={0}
                                    max={isTypeStars ? 10 : undefined}
                                    step={1}
                                    onChange={val => {
                                        this.handleChange(idx, "amount", val);
                                    }}
                                />

                                <TextField
                                    label="Description"
                                    value={v.get("description")}
                                    onChange={val => {
                                        this.handleChange(
                                            idx,
                                            "description",
                                            val
                                        );
                                    }}
                                />
                            </FormLayout.Group>

                            <Checkbox
                                label="Include a + sign after the number"
                                checked={v.get("includePlus")}
                                onChange={isChecked => {
                                    this.handleChange(
                                        idx,
                                        "includePlus",
                                        isChecked
                                    );
                                }}
                            />
                        </FormLayout>
                    </Card.Section>
                </Card>
            );
        });

        const renderedJsx = this.props.milestones.map((v, idx) => {
            let props = v.toJS();
            return <RenderedMilestone {...props} />;
        });

        return (
            <Page title="Milestones">
                {milestoneFormJsx}

                <Card title={"Preview"}>
                    <Card.Section>
                        <p>
                            Your milestones show up in a grid. Here's a preview
                            of your current milestones.
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
                            content: "Go Back",
                            onClick: this.props.onCancel
                        },
                        {
                            content: "Add New Milestone",
                            onClick: this.props.onAdd
                        }
                    ]}
                />
            </Page>
        );
    }
}

export default Milestone;
