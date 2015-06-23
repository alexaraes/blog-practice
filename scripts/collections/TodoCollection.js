var TodoCollection = Backbone.Collection.extend({
    model: TodoModel,
    parseClassName: 'todo',
});