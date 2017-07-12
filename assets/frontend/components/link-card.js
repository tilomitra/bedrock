import React, { Component } from "react";
import { Card, Stack, Button } from "@shopify/polaris";
import { Link } from "react-router-dom";

class LinkCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Section>
                    <Stack alignment="center">
                        <Stack.Item fill>
                            {this.props.description}
                        </Stack.Item>
                        <Stack.Item>
                            <Link to={this.props.url}>
                                <Button>
                                    {this.props.buttonTitle}
                                </Button>
                            </Link>
                        </Stack.Item>
                    </Stack>
                </Card.Section>
            </Card>
        );
    }
}

export default LinkCard;
