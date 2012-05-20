UserSessionConfiguration.signUpLimit = 1;

StorySources = new Meteor.Collection('storySources');
Stories = new Meteor.Collection('stories');
Blog = new Meteor.Collection('blogs');

Secure.noDataMagic('storySources');
Secure.noDataMagic('stories');
Secure.noDataMagic('blogs');

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

StorySources.remove({});
StorySources.insert({
  user: "possibilities",
  repo: "moon-blog-test-stories"
});

// Helpers

StoryHelpers = {
  loadFromGitHub: function() {
    StorySources.find().forEach(function(source) {
      var blogStories = new GitHubStories(source);
      var stories = blogStories.stories();
      _.each(stories, function(story) {
        var existingStory = Stories.findOne({ path: story.path });
        if (existingStory) {
          var existingStoryId = existingStory._id;
          delete existingStory._id;
          Stories.update(existingStoryId, { $set: story });
        } else {
          Stories.insert(story);
        }
      });
    });
  }
};

// Load blog data

StoryHelpers.loadFromGitHub();

// Load stories every minute
// TODO figure out how to use a github hook
Meteor.setInterval(function() {
  StoryHelpers.loadFromGitHub();
}, (60 * 1000));

// Global reference to the blog object
var blog = Blog.findOne();
// Make one if we don't have one
if (!blog) {
  blog = {
    title: 'Moon',
    subtitle: 'Welcome to the Moon Blog demo!'
  };
  Blog.insert(blog);
}
// Cache the id globally also
var blogId = blog._id;

Meteor.methods({
  updateBlog: function(key, val) {
    var setValues = {};
    setValues[key] = val;
    Blog.update(blogId, {
      $set: setValues
    });
  }
});
