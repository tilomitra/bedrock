import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "../bulma/modal";
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedImageUrl: undefined
        };
    }

    handleImageClick(e) {
        this.setState({
            isOpen: true,
            selectedImageUrl: e.imageUrl
        });
    }

    render() {
        let imageJsx = this.props.images.map((i, idx) => {
            return (
                <div
                    className="pk-gallery-item column is-4"
                    key={`gallery-${idx}`}
                >
                    <img
                        onClick={() => {
                            this.handleImageClick(i);
                        }}
                        className="pk-gallery-item-image"
                        src={i.imageUrl}
                        alt={i.caption}
                    />
                    <caption className="pk-gallery-item-caption">
                        {i.caption}
                    </caption>
                </div>
            );
        });

        return (
            <section className="pk-gallery">
                <Modal
                    isOpen={this.state.isOpen}
                    imageUrl={this.state.selectedImageUrl}
                    handleClose={() => {
                        this.setState({ isOpen: false });
                    }}
                />
                <section className="columns is-multiline">
                    {imageJsx}
                </section>
            </section>
        );
    }
}

Gallery.PropTypes = {
    images: PropTypes.array
};

export default Gallery;
