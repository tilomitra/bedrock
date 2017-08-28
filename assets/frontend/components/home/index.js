var React = require("react");

module.exports = React.createClass({
    displayName: "HomePage",
    render: function() {
        return (
            <div className="homePage">
                <div className="ui center aligned raised very padded text container segment">
                    <h2 className="ui header">
                        Hello world!
                        <div className="sub header">
                            I'm a React component. You can find me in{" "}
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
