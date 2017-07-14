"use strict";

import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color";

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: "#7fac63"
        };
    }

    handleClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    }

    handleClose() {
        this.setState({ displayColorPicker: false });
    }

    handleChange(color) {
        this.setState({ color: color.hex });
        this.props.onChange(color);
    }

    render() {
        const styles = reactCSS({
            default: {
                color: {
                    width: "72px",
                    height: "28px",
                    borderRadius: "2px",
                    background: this.state.color
                },
                swatch: {
                    padding: "5px",
                    background: "#fff",
                    borderRadius: "1px",
                    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                    display: "inline-block",
                    cursor: "pointer"
                },
                popover: {
                    position: "absolute",
                    zIndex: "10",
                    left: "50%",
                    marginLeft: -110 //half of width
                },
                cover: {
                    position: "fixed",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px"
                }
            }
        });

        return (
            <div>
                <div
                    style={styles.swatch}
                    onClick={this.handleClick.bind(this)}
                >
                    <div style={styles.color} />
                </div>
                <h5 style={{ color: this.state.color, fontWeight: "bold" }}>
                    {this.state.color}
                </h5>
                {this.state.displayColorPicker
                    ? <div style={styles.popover}>
                          <div
                              style={styles.cover}
                              onClick={this.handleClose.bind(this)}
                          />
                          <SketchPicker
                              color={this.state.color}
                              onChange={this.handleChange.bind(this)}
                          />
                      </div>
                    : null}
            </div>
        );
    }
}

export default ColorPicker;
