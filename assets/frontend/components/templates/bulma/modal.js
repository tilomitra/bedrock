import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "bulma/css/bulma.css";

class Modal extends Component {
    render() {
        return (
            <div
                className={classnames("modal", {
                    "is-active": this.props.isOpen
                })}
            >
                <div
                    className="modal-background"
                    onClick={this.props.handleClose}
                />
                <div className="modal-content">
                    <p className="image">
                        <img src={this.props.imageUrl} />
                    </p>
                </div>
                <button
                    className="modal-close is-large"
                    onClick={this.props.handleClose}
                />
            </div>
        );
    }
}

Modal.PropTypes = {
    imageUrl: PropTypes.string,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func
};

export default Modal;
