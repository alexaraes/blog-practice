var parseSettings = require('../../config/parse.js');
var Backbone = require('backparse')(parseSettings);

module.exports = Backbone.Model.extend({
    defaults: {
        title: '',
        body: ''
    },
    parseClassName: '_User',
    idAttribute: 'objectId'
});
