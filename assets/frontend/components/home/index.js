var React = require('react');

module.exports = React.createClass({
    displayName: "HomePage",
    render: function () {
        return (
            <div className='homePage'>
                <div className="ui center aligned raised very padded text container segment">
                    <h2 className="ui header">Hello World</h2>
                </div>
            </div>
        );
    }
});

