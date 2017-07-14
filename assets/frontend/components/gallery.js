import React, { Component } from "react";
import { Page, Card, Button, TextField, PageActions } from "@shopify/polaris";

import RenderedGallery from "./templates/components/gallery";

class Gallery extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(idx, attr, value) {
        this.props.onUpdate(idx, attr, value);
    }

    render() {
        const formJsx = this.props.images.map((v, idx) => {
            return (
                <Card
                    title={v.get("caption")}
                    key={`ms-card-${idx}`}
                    secondaryFooterAction={{
                        content: "Delete",
                        onClick: () => {
                            this.props.onRemove(idx);
                        }
                    }}
                >
                    <Card.Section>
                        <TextField
                            label="Image URL"
                            value={v.get("imageUrl")}
                            onChange={val => {
                                this.handleChange(idx, "imageUrl", val);
                            }}
                        />
                        <TextField
                            label="Caption"
                            value={v.get("caption")}
                            onChange={val => {
                                this.handleChange(idx, "caption", val);
                            }}
                        />
                    </Card.Section>
                </Card>
            );
        });

        return (
            <Page title="Gallery">
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
                            content: "Add New Image",
                            onClick: this.props.onAdd
                        }
                    ]}
                />

                {formJsx}

                <Card title={"Preview"}>
                    <Card.Section>
                        <p>
                            Your gallery items show up in a grid. Clicking on
                            one will open it up to become fullscreen.
                        </p>
                        <hr />
                        <RenderedGallery images={this.props.images.toJS()} />
                    </Card.Section>
                </Card>
            </Page>
        );
    }
}

export default Gallery;
