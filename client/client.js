Stories = new Meteor.Collection('stories');
Blog = new Meteor.Collection('blogs');

Meteor.subscribe('stories');
Meteor.subscribe('blogs');

Template.blog.blog = function() {
  return Blog.findOne();
};

Template.blog.storyList = function() {
  return Stories.find();
};

Template.story.publishedAt = function() {
  return moment(new Date(this.publishedAt)).format('MMMM do YYYY');
};
