import React from "react";
import ReactQuill from "react-quill";
import { Page, Card, Button, PageActions, Heading } from "@shopify/polaris";
import theme from "react-quill/dist/quill.snow.css";

import RenderedAbout from "./templates/components/about";

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
        ],
        ["link", "image"],
        ["clean"]
    ]
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
];

class About extends React.Component {
    render() {
        return (
            <Page title="About">
                <Heading>About</Heading>
                <Card title="Write your content">
                    <Card.Section>
                        <ReactQuill
                            value={this.props.content.get("html")}
                            onChange={this.props.onUpdate}
                            modules={modules}
                            formats={formats}
                        />
                    </Card.Section>
                </Card>

                <Card title="Preview">
                    <Card.Section>
                        <RenderedAbout
                            content={this.props.content.get("html")}
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

export default About;
