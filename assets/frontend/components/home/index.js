import React from "react";
import { connect } from "react-redux";

import Actions from "../../actions";

var CounterComponent = React.createClass({
    displayName: "Counter",
    incrementIfOdd() {
        if (this.props.value % 2 !== 0) {
            this.onIncrement();
        }
    },

    incrementAsync() {
        setTimeout(this.onIncrement, 1000, this);
    },

    onIncrement() {
        this.props.incrementCounter();
    },
    onDecrement() {
        this.props.decrementCounter();
    },
    render: function() {
        const value = this.props.value;
        return (
            <p>
                Clicked: {value} times
                {" "}
                <button onClick={this.onIncrement}>
                    +
                </button>
                {" "}
                <button onClick={this.onDecrement}>
                    -
                </button>
                {" "}
                <button onClick={this.incrementIfOdd}>
                    Increment if odd
                </button>
                {" "}
                <button onClick={this.incrementAsync}>
                    Increment async
                </button>
            </p>
        );
    }
});

const mapStateToProps = state => {
    return {
        value: state.counter.value
    };
};
const mapDispatchToProps = dispatch => {
    return {
        incrementCounter: url => dispatch(Actions.incrementCounter()),
        decrementCounter: url => dispatch(Actions.decrementCounter())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
