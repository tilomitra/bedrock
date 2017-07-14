import React, { Component } from "react";
import { Card, CalloutCard } from "@shopify/polaris";

import AceEditor from "react-ace";
import brace from "brace";

import "brace/theme/github";
import "brace/mode/css";

class CSSEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            css: ""
        };
    }

    onCodeChange(codeVal) {
        this.setState({
            css: codeVal
        });
        this.props.onChange(codeVal);
    }

    render() {
        if (this.state.isOpen) {
            return (
                <Card
                    title="Add Custom CSS"
                    actions={[
                        {
                            content: "Done Editing",
                            onClick: () => {
                                this.setState({ isOpen: false });
                            }
                        }
                    ]}
                >
                    <Card.Section>
                        <p>
                            As you write your CSS styles here, the Live Preview
                            below will automatically update. You'll be able to
                            see your CSS changes in real time.
                        </p>
                        <p>
                            Once you are done making changes, don't forget to
                            save or publish.
                        </p>
                        <AceEditor
                            mode="css"
                            theme="github"
                            onChange={this.onCodeChange.bind(this)}
                            name="csseditor"
                            value={this.state.css}
                            editorProps={{ $blockScrolling: true }}
                        />
                    </Card.Section>
                </Card>
            );
        } else {
            return (
                <CalloutCard
                    title="Add Custom CSS"
                    illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                    primaryAction={{
                        content: "Edit CSS",
                        onClick: () => {
                            this.setState({ isOpen: true });
                        }
                    }}
                >
                    <p>
                        Customize the CSS of your Press Kit by adding your own
                        styles.
                    </p>
                </CalloutCard>
            );
        }
    }
}
export default CSSEditor;
