StorySources = new Meteor.Collection('storySources');
Stories = new Meteor.Collection('stories');
Blog = new Meteor.Collection('blogs');

Meteor.subscribe('storySources');
Meteor.subscribe('stories');
Meteor.subscribe('blogs');

Template.blog.blog = function() {
  return Blog.findOne();
};

Template.preferencesPane.blog = function() {
  return Blog.findOne();
};

Template.preferencesPane.sources = function() {
  return StorySources.find();
};

Template.blog.storyList = function() {
  var params = {
    sort: {
      publishedAtStamp: -1
    }
  };
  return Stories.find({}, params);
};

Template.story.publishedAt = function() {
  return moment(this.publishedAt).format('MMMM Do YYYY');
};

Template.preferencesActivator.currentUser = UserSessionHelpers.currentUser;
Template.admin.currentUser = UserSessionHelpers.currentUser;
// TODO: these should be moved out of user-sessions if they're generically useful
Template.preferencesActivator.events = UserSessionHelpers.commonActivatorEvents;
Template.preferencesPane.events = UserSessionHelpers.commonFormEvents;
