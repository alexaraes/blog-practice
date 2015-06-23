var React = require('react');
var User = require('../models/UserModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors:{}
		}
	},
	render: function() {
		return (
			<form type="submit" ref="regForm" onSubmit={this.logIn}>
				<label>Username</label><br />
				<input type="text" ref="username" /><br />
				<div className="errorText">{this.state.errors.username}</div>
				<label>Password</label><br />
				<input type="password" ref="password" /><br />
				<div className="errorText">{this.state.errors.password}</div>
				<div className="errorText" ref="serverError"></div>
				<button type="submit">Login</button><br />
			</form>
		);
	},
	logIn: function(e) {
		var that = this;
		var username = that.refs.username.getDOMNode().value;
		var password = that.refs.password.getDOMNode().value;

		var errors = {};

		e.preventDefault();

		if (that.refs.username.getDOMNode().value === '') {
			errors.username = 'Please enter your username.';
		}
		if (that.refs.password.getDOMNode().value === '') {
			errors.password = 'Please enter your password.';
		}

		that.setState({errors: errors});

		var currentUser = new User();

		currentUser.login(
			{			
			username: that.refs.username.getDOMNode().value,
			password: that.refs.password.getDOMNode().value
			}, 
			{
			    success: function(userModel) {
			        console.log('user was logged in');
			        that.props.myApp.navigate('home', {trigger: true});
			    },
			    error: function(userModel, response) {
			    	that.refs.serverError.getDOMNode().innerHTML = response.responseJSON.error;
			        console.log('user was not logged in', response.responseJSON);
			    }
		});
	}
});