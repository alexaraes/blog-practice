var React = require('react');
var PostModel = require('../models/PostModel');
var _ = require('../../node_modules/backbone/node_modules/underscore/underscore-min.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors:{}
		}
	},
	render: function() {
		return (
			<form type="submit" className="postForm" onSubmit={this.submitPost}>

				<div className="titleDiv">
					<label>Title</label><br />
					<input type="text" ref="title" className="postTitleInput" /><br />
					<div className="errorText">{this.state.errors.title}</div>
				</div>

				<div className="postDiv">
					<label>Write Something!</label><br />
					<textarea ref="body" className="postBodyInput"></textarea><br />
					<div className="errorText">{this.state.errors.body}</div>
				</div>

				<div className="catDiv">
					<select ref="category">
						<option value=''>Choose your category</option>
						<option value='javascript'>Javascript</option>
						<option value='react'>React</option>
						<option value='backbone'>Backbone</option>
						<option value='beer'>Beer</option>
						<option value='pizza'>Pizza</option>
					</select>
					<div className="errorText">{this.state.errors.category}</div>
				</div>

				<div className="postButton">
					<button type="submit" ref="postSubmit">Post!</button>
					<div className="serverError"></div>
				</div>
			</form>
		)
	},
	submitPost: function(e) {
		e.preventDefault();

		var that = this;
		var errors = {};

		var newPost = new PostModel({
			title: this.refs.title.getDOMNode().value,
			body: this.refs.body.getDOMNode().value,
			category: this.refs.category.getDOMNode().value
		});

		if (!newPost.get('title')) {
			errors.title = 'Woops! Looks like your post needs a title.';
		}
		if (!newPost.get('body')) {
			errors.username = 'Uh-oh. Looks like you didn\'t write anything.';
		}

		if(_.isEmpty(errors)) {

			newPost.save(
				null, 
				{
			    success: function(postModel) {
			    	that.props.myApp.navigate('/post/'+newPost.id, {trigger: true});
			        console.log('post was posted');
			    },
			    error: function(postModel, response) {
			    	that.refs.serverError.getDOMNode().innerHTML = response.responseJSON.error;
			        console.log('post was not posted', response.responseJSON);
			    }
			});
		}

		else {
			that.setState({errors: errors});
		}
	}
});





