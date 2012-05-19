UserSessionConfiguration.signUpLimit = 1;

StorySources = new Meteor.Collection('storySources');
Stories = new Meteor.Collection('stories');
Blog = new Meteor.Collection('blogs');

Secure.noDataMagic('storySources');
Secure.noDataMagic('stories');
Secure.noDataMagic('blogs');

StorySources.remove({});
Stories.remove({});
Blog.remove({});

Meteor.publish('storySources', function() {
  return StorySources.find();
});

Meteor.publish('stories', function() {
  return Stories.find();
});

Meteor.publish('blogs', function() {
  return Blog.find();
});

Blog.insert({
  title: "Give Me Space!",
  subtitle: "Mike Bannister's Meteor Blog"
});

StorySources.insert({
  user: "possibilities",
  repo: "give-me-space"
});

// Helpers

BlogHelpers = {
  loadFromGitHub: function() {
    var source = StorySources.findOne();
    var blogStories = new GitHubStories(source);
    var stories = blogStories.stories();
    _.each(stories, function(story) {
      Stories.insert(story);
    });
  }
};

// Load blog data

BlogHelpers.loadFromGitHub();
