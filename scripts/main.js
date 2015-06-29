var React = require('react');
var Backbone = require('backbone');
var UserModel = require('./models/UserModel.js');
var PostCollection = require('./collections/PostCollection.js');

var RegisterComponent = require('./components/RegisterComponent.js');
var LoginComponent = require('./components/LoginComponent.js');
var PostListComponent= require('./components/PostListComponent.js');
var SubmitPostComponent = require('./components/SubmitPostComponent.js');
var NavBarComponent= require('./components/NavBarComponent.js');
var SinglePostComponent = require('./components/IndivPostComponent.js');

var user = new UserModel();
var posts = new PostCollection();
var postList = (<PostListComponent myApp={myApp} posts={posts} />);

var containerEl = document.getElementById('container');

React.render(
	<NavBarComponent user={user} myApp={myApp} />,
	document.getElementById('nav')
);

function fetchPosts(category, query) {
	var q = {};
	if(category) {
		q.category = category;
	}

	posts.fetch({
		query: q,
		success: function() {
			React.render(postList, containerEl);
		}
	});
}

var App = Backbone.Router.extend({
	routes: {
		'': 'feed',
		'home': 'feed',
		'post/:postId': 'post',
		'category/:category': 'category',
		'search/:query': 'search',
		'login': 'login',
		'register': 'register',
		'submitpost': 'submitpost'
	},
	login: function() {
		React.render(
			<LoginComponent user={user} myApp={myApp}/>,
			containerEl
		)
	},
	register: function() {
		React.render(
			<RegisterComponent user={user} myApp={myApp} />,
			containerEl
		)
	},
	submitpost: function() {
		React.render(
			<SubmitPostComponent myApp={myApp} />,
			containerEl
		)
	},
	category: function(category) {
		fetchPosts(category);
		React.render(postList, containerEl);
	},
	search: function(query) {
		fetchPosts(query);
		React.render(postList, containerEl);
	},
	feed: function(posts) {
		fetchPosts();
		React.render(
			postList,
			containerEl
		)
	},
	post: function(postId) {
		React.render(
			<SinglePostComponent postId={postId} myApp={myApp} />,
			containerEl
		)
	}
});

var myApp = new App();
Backbone.history.start();

user.me();