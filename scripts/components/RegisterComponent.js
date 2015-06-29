var React = require('react');
var NewUser = require('../models/UserModel');
var _ = require('backbone/node_modules/underscore');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors:{}
		}
	},
	render: function() {
		return (
			<form type="submit" ref="regForm" onSubmit={this.register}>
				<label>Email</label><br />
				<input type="text" ref="email" /><br />
				<div className="errorText">{this.state.errors.email}</div>

				<label>Username</label><br />
				<input type="text" ref="username" /><br />
				<div className="errorText">{this.state.errors.username}</div>

				<label>Password</label><br />
				<input type="password" ref="password" /><br />
				<div className="errorText">{this.state.errors.password}</div>

				<label>Verify Password</label><br />
				<input type="password" ref="verifyPass" /><br />
				<div className="errorText">{this.state.errors.verifyPass}</div>
				<div className="errorText">{this.state.errors.isPass}</div>
				<div className="errorText" ref="serverError"></div>

				<button type="submit">Register</button><br />
			</form>
		);
	},
	register: function(e) {
		e.preventDefault();

		var that = this;
		var errors = {};

			this.props.user.set("username", that.refs.username.getDOMNode().value);
			this.props.user.set("email", that.refs.email.getDOMNode().value);
			this.props.user.set("password", that.refs.password.getDOMNode().value);

		console.log(user.get('email'));

		if (!this.props.user.get('email')) {
			errors.email = 'please enter an email address';
		}
		if (!this.props.user.get('username')) {
			errors.username = 'please enter a username';
		}
		if (!this.props.user.get('password')) {
			errors.password = 'please enter a password';
		}
		if (this.props.useruser.get('password') !== that.refs.verifyPass.getDOMNode().value) {
			errors.isPass = 'please make sure your passwords match';
		}
		console.log(errors);
		if(_.isEmpty(errors)) {

			this.props.user.save(
				null, 
				{
			    success: function(userModel) {
			    	that.props.myApp.navigate('home', {trigger: true});
			        console.log('user was registered');
			    },
			    error: function(userModel, response) {
			    	that.refs.serverError.getDOMNode().innerHTML = response.responseJSON.error;
			        console.log('user was not registered', response.responseJSON);
			    }
			});
		}

		else {
			that.setState({errors: errors});
		}
	}
});
