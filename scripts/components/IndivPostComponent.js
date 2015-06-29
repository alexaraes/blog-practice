var React = require('react');
var PostModel = require('../models/PostModel');
var moment = require('../../node_modules/moment/moment.js');

module.exports = React.createClass({
	getInitialState: function() {
		var that = this;
		var post = new PostModel({
			objectId: this.props.postId
		});
		post.fetch();
		post.on('change', function() {
			that.forceUpdate();
		});
		console.log(post);
		return {
			post: post
		};
	},
	render: function() {

		var postDate = moment(this.state.post.get('createdAt')).fromNow();
		
		return (
			<div className="postListDiv">
				<div>
					<h1 className="postTitle">{this.state.post.get('title')}</h1>
					<p className="postBody">{this.state.post.get('body')}</p>
					<div className="postDate">{postDate}</div>
					<div><a href={'#category/'+this.state.post.get('category')} className="postCat">{this.state.post.get('category')}</a></div>
				</div>
			</div>
		);
	}
});