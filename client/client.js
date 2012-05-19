StorySources = new Meteor.Collection('storySources');
Stories = new Meteor.Collection('stories');
Blog = new Meteor.Collection('blogs');

Meteor.subscribe('storySources');
Meteor.subscribe('stories');
Meteor.subscribe('blogs');

BlogHelpers = {
  storyListQuery: function() {
    var params = {
      sort: {
        publishedAtStamp: -1
      }
    };
    return Stories.find({}, params);
  },
  storyList: function() {
    return BlogHelpers.storyListQuery().fetch();
  },
  indexForStory: function() {
    var stories = BlogHelpers.storyList();
    return _.indexOf(_.pluck(stories, '_id'), this._id);    
  }
};

Template.blog.blog = function() {
  return Blog.findOne();
};

Template.preferencesPane.blog = function() {
  return Blog.findOne();
};

Template.preferencesPane.sources = function() {
  return StorySources.find();
};

Template.blog.storyList = BlogHelpers.storyList;

Handlebars.registerHelper('index', BlogHelpers.indexForStory);

Handlebars.registerHelper('first', function() {
  return BlogHelpers.indexForStory.call(this) === 0;
});

Handlebars.registerHelper('last', function() {
  var storyCount = BlogHelpers.storyListQuery().count();
  return BlogHelpers.indexForStory.call(this) === (storyCount - 1);
});

Template.story.publishedAt = function() {
  return moment(this.publishedAt).format('MMMM Do YYYY');
};

Template.preferencesActivator.currentUser = UserSessionHelpers.currentUser;
Template.admin.currentUser = UserSessionHelpers.currentUser;
// TODO: these should be moved out of user-sessions if they're generically useful
Template.preferencesActivator.events = UserSessionHelpers.commonActivatorEvents;
Template.preferencesPane.events = UserSessionHelpers.commonFormEvents;
