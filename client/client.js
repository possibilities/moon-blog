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
  return Stories.find();
};

Template.story.publishedAt = function() {
  return moment(new Date(this.publishedAt)).format('MMMM do YYYY');
};

Template.preferencesActivator.currentUser = UserSessionHelpers.currentUser;
// TODO: these should be moved out of user-sessions if they're generically userful
Template.preferencesActivator.events = UserSessionHelpers.commonActivatorEvents;
Template.preferencesPane.events = UserSessionHelpers.commonFormEvents;
