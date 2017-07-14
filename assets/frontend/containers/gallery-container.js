import React, { Component } from "react";
import { Page, Card, Button, FormLayout, TextField } from "@shopify/polaris";

import { connect } from "nuclear-js-react-addons";
import CommonModule from "../modules/common";
import Gallery from "../components/gallery";

class GalleryContainer extends Component {
    onAddGallery(val) {
        CommonModule.actions.addGallery();
    }

    onRemoveGallery(idx) {
        CommonModule.actions.removeGallery(idx);
    }

    onUpdateGallery(idx, attr, value) {
        CommonModule.actions.updateGallery(idx, attr, value);
    }

    onSave(e) {}

    onCancel(e) {
        this.props.history.push("/app");
    }

    render() {
        return (
            <Gallery
                images={this.props.gallery}
                onAdd={this.onAddGallery.bind(this)}
                onRemove={this.onRemoveGallery.bind(this)}
                onUpdate={this.onUpdateGallery.bind(this)}
                onSave={this.onSave.bind.bind(this)}
                onCancel={this.onCancel.bind(this)}
            />
        );
    }
}

function mapStateToProps(props) {
    return {
        gallery: CommonModule.getters.gallery
    };
}

const ConnectedContainer = connect(mapStateToProps)(GalleryContainer);
export default ConnectedContainer;
