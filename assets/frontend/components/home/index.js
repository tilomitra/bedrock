import React from "react";
import reactor from "../../reactor";
import CommonModule from "../../modules/common";

module.exports = React.createClass({
    displayName: "HomePage",
    mixins: [reactor.ReactMixin],
    getDataBindings() {
        return {
            counter: CommonModule.getters.counter
        };
    },

    onIncrement() {
        CommonModule.actions.incrementCounter();
    },

    onDecrement() {
        CommonModule.actions.decrementCounter();
    },

    render() {
        return (
            <div className="homePage">
                <span>{this.state.counter.get("value")}</span>
                <button onClick={this.onIncrement}>+ Increment</button>
                <button onClick={this.onDecrement}>- Decrement</button>
            </div>
        );
    }
});
