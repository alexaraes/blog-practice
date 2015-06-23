var React = require('react');
var Backbone = require('backbone');
var UserModel = require('./models/UserModel.js');
var RegisterComponent = require('./components/RegisterComponent.js');
var LoginComponent = require('./components/LoginComponent.js');
var HomeComponent = require('./components/HomeComponent.js');

var user = new UserModel();

var App = Backbone.Router.extend({
	routes: {
		'home': 'home',
		'login': 'login',
		'register': 'register'
	},
	home: function() {
		React.render(
			<HomeComponent />,
			document.getElementById('container')
		)
	},
	login: function() {
		React.render(
			<LoginComponent myApp={myApp}/>,
			document.getElementById('container')
		)
	},
	register: function() {
		React.render(
			<RegisterComponent />,
			document.getElementById('container')
		)
	}
});

var myApp = new App();
Backbone.history.start();