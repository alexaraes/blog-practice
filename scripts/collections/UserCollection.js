var UserModel = require('../models/UserModel.js');

var UserCollection = Backbone.Collection.extend({
    model: UserModel,
    parseClassName: 'user',
});