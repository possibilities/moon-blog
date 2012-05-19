UserSessionConfiguration.signUpLimit = 1;

StorySources = new Meteor.Collection('storySources');
Stories = new Meteor.Collection('stories');
Blog = new Meteor.Collection('blogs');

Secure.noDataMagic('storySources');
Secure.noDataMagic('stories');
Secure.noDataMagic('blogs');

StorySources.remove({});

Meteor.publish('storySources', function() {
  return StorySources.find();
});

Meteor.publish('stories', function() {
  var query = {
    publishedAtStamp: {
      $exists : true
    }
  };
  var params = {
    sort: {
      publishedAtStamp: -1
    }
  };
  return Stories.find(query, params);
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
  repo: "moon-blog-test-stories"
});

// Helpers

BlogHelpers = {
  loadFromGitHub: function() {
    StorySources.find().forEach(function(source) {
      var blogStories = new GitHubStories(source);
      var stories = blogStories.stories();
      _.each(stories, function(story) {
        var existingStory = Stories.findOne({ path: story.path });
        if (existingStory) {
          Stories.remove(existingStory._id);
        }
        Stories.insert(story);
      });
    });
  }
};

// Load blog data

BlogHelpers.loadFromGitHub();

// Load stories every minute
// TODO figure out how to use a github hook
Meteor.setInterval(function() {
  BlogHelpers.loadFromGitHub();
}, (60 * 1000));
