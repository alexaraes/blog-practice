var React = require('react');
var PostCollection = require('../collections/PostCollection');
var PostModel = require('../models/PostModel');
var moment = require('../../node_modules/moment/moment.js');

module.exports = React.createClass({
	render: function() {
		this.props.posts.models.reverse(); 
		var postEls = this.props.posts.map(function(postModel) {

			var postDate = moment(postModel.get('createdAt')).fromNow();

			return (
				<div className="postListDiv" key={postModel.cid}>
					<div className="postTitle">{postModel.get('title')}</div>
					<div className="postBody">{postModel.get('body')}</div>
					<div className="postDate">{postDate}</div>
					<div><a href={'#category/'+postModel.get('category')} className="postCat">{postModel.get('category')}</a></div>
				</div>
			);
		});
		return (
			<div>
				<div>
					{postEls}
				</div>
			</div>
		);
	}
});