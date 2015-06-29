var React = require('react');

module.exports = React.createClass({
	componentWillMount: function () {
	    this.props.user.on('change', function() {
	    	
	    	this.forceUpdate();
	    	console.log('update check');

	    }, this);
	},
	render: function() {
		console.log('render nav', this.props.user);
		var loggedInNav = null;
		var links = [];
		
		if(!this.props.user.id) {
			links.push(<div className="linkDiv"><a href="#home">Posts </a></div>);
			links.push(<div className="linkDiv"><a href="#register"> Register </a></div>);
			links.push(<div className="linkDiv"><a href="#login"> Login</a></div>);
		}
		if (this.props.user.id) {

			loggedInNav = (
				<div className="nav">
					<div className="linkDiv"><a href="#submitpost"> Write </a></div>
					<div className="linkDiv"><a href="#home"> Read </a></div>
					<div className="linkDiv"><a href="#" onClick={this.onLogOut}> Log out</a></div>
					<div className="searchForm">
						<form type="submit" onSubmit={this.onSearch}>
							<input ref="search" className="searchBar" type="text" />
							<button className="searchBtn" type="submit">Search!</button>
						</form>
					</div>
				</div>
			);
		}
		return (
			<nav className="nav">
				<div>{links}</div>
				<div>{loggedInNav}</div>
			</nav>
		);
	},
	onLogOut: function() {
		this.props.user.logout();
	},
	onSearch: function() {
		console.log('attempted search');
		this.props.myApp.navigate('/search/'+this.refs.search.getDOMNode().value, {trigger: true});
	}
});