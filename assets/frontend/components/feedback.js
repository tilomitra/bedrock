import React, { Component } from "react";
import { Card, FormLayout, TextField } from "@shopify/polaris";
import { Link } from "react-router-dom";
import CommonModule from "../modules/common";

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            feedback: "",
            isSent: false
        };
    }

    sendFeedback(e) {
        e.preventDefault();
        let { email, feedback } = this.state;
        CommonModule.actions.sendFeedback(email, feedback);
        this.setState({ isSent: true });
    }

    onEmailChange(val) {
        this.setState({ email: val });
    }
    onFeedbackChange(val) {
        this.setState({ feedback: val });
    }

    render() {
        let primaryAction = {
            content: "Send",
            onClick: this.sendFeedback.bind(this)
        };
        let contentJsx = (
            <FormLayout>
                <TextField
                    type="email"
                    label="Your email"
                    value={this.state.email}
                    onChange={this.onEmailChange.bind(this)}
                />
                <TextField
                    label="Your Feedback"
                    multiline={true}
                    value={this.state.feedback}
                    spellCheck={true}
                    onChange={this.onFeedbackChange.bind(this)}
                />
            </FormLayout>
        );
        if (this.state.isSent) {
            contentJsx = (
                <p>
                    Thanks for your feedback. We appreciate it. We will review
                    it and get back to you if we have any questions.
                </p>
            );
            primaryAction = undefined;
        }

        return (
            <Card title="Give Feedback" primaryFooterAction={primaryAction}>
                <Card.Section>
                    We love hearing from you! Let us know what features you are
                    looking for, and we'll do our best to add them to Press
                    Kitty.
                </Card.Section>
                <Card.Section>
                    {contentJsx}
                </Card.Section>
            </Card>
        );
    }
}

export default Feedback;
