import React from "react";
import common from "../../modules/common";
import { connect } from "nuclear-js-react-addons";

const Home = React.createClass({
    displayName: "HomePage",

    increase() {
        common.actions.increase();
    },
    decrease() {
        common.actions.decrease();
    },
    render: function() {
        return (
            <div className="homePage">
                <div className="ui center aligned raised very padded text container segment">
                    <h2 className="ui header">
                        Hello World {this.props.counter.get("count")}
                        <button onClick={this.increase}>+</button>
                        <div className="sub header">
                            I'm a happy React component. You can find me in{" "}
                            <code>
                                assets/frontend/components/home/index.js
                            </code>.
                        </div>
                    </h2>
                </div>
            </div>
        );
    }
});

function mapStateToProps(props) {
    return {
        counter: common.getters.counter
    };
}
export default connect(mapStateToProps)(Home);
