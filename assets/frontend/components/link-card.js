import React, { Component } from "react";
import { Card, Stack, Button } from "@shopify/polaris";
import { Link } from "react-router-dom";

class LinkCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card title={this.props.title}>
                <Card.Section>
                    {this.props.description}
                </Card.Section>
                <Card.Section>
                    <Link to={this.props.url}>
                        <Button>
                            {this.props.buttonTitle}
                        </Button>
                    </Link>
                </Card.Section>
            </Card>
        );
    }
}

export default LinkCard;
