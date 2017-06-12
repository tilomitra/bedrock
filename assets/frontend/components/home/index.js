import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
        this.props.dispatch(Actions.incrementCounter());
    },
    onDecrement() {
        this.props.dispatch(Actions.decrementCounter());
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

                <Link to={"/foo"}>Go to foo</Link>
            </p>
        );
    }
});

const mapStateToProps = state => {
    return {
        value: state.counter.value
    };
};
export default connect(mapStateToProps)(CounterComponent);
