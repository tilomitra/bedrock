import React, { Component } from "react";
import {
    Page,
    Card,
    Button,
    FormLayout,
    TextField,
    PageActions
} from "@shopify/polaris";

import RenderedMission from "./templates/components/mission";

class Mission extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page title="Mission and Tagline">
                <Card title="Mission and Tagline">
                    <Card.Section>
                        <FormLayout>
                            <TextField
                                label="Mission"
                                value={this.props.title}
                                onChange={this.props.onMissionChange}
                            />
                            <TextField
                                label="Tagline"
                                value={this.props.tagline}
                                onChange={this.props.onTaglineChange}
                            />
                        </FormLayout>
                    </Card.Section>
                </Card>

                <Card title="Preview">
                    <Card.Section>
                        <p>
                            The content below is a preview of how your Mission
                            and Tagline will appear in the Press Kit.
                        </p>
                        <RenderedMission
                            title={this.props.title}
                            subtitle={this.props.tagline}
                        />
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
                        }
                    ]}
                />
            </Page>
        );
    }
}

export default Mission;
