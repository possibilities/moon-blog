StorySources = new Meteor.Collection('storySources');
Stories = new Meteor.Collection('stories');
Blog = new Meteor.Collection('blogs');

Meteor.subscribe('storySources');
Meteor.subscribe('stories');
Meteor.subscribe('blogs');

StoryHelpers = {
  listQuery: function() {
    var params = {
      sort: {
        publishedAtStamp: -1
      }
    };
    return Stories.find({}, params);
  },
  list: function() {
    return StoryHelpers.listQuery().fetch();
  },
  indexFor: function() {
    var stories = StoryHelpers.list();
    return _.indexOf(_.pluck(stories, '_id'), this._id);    
  }
};

BlogHelpers = {
  title: function() {
    var blog = Blog.findOne();
    if (blog) {
      return blog.title;
    }
  },
  subtitle: function() {
    var blog = Blog.findOne();
    if (blog) {
      return blog.subtitle;
    }
  }
};

Template.blog.title = BlogHelpers.title;
Template.blog.subtitle = BlogHelpers.subtitle;
Template.blogPreferences.title = BlogHelpers.title;
Template.blogPreferences.subtitle = BlogHelpers.subtitle;

Template.storySourcePreferences.sources = function() {
  return StorySources.find({}, {
    sort: {
      createdAtStamp: -1
    }
  });
};

Template.blog.storyList = StoryHelpers.list;

// TODO generalize these, init with simple declaration
Handlebars.registerHelper('index', StoryHelpers.indexFor);

Handlebars.registerHelper('first', function() {
  return StoryHelpers.indexFor.call(this) === 0;
});

Handlebars.registerHelper('last', function() {
  var storyCount = StoryHelpers.listQuery().count();
  return StoryHelpers.indexFor.call(this) === (storyCount - 1);
});

Template.story.publishedAt = function() {
  return moment(this.publishedAt).format('MMMM Do YYYY');
};

Template.storySourcePreferences.events = {
  'click .delete-story-source': function(e) {
    if (!confirm("Are you sure?"))
      return false;

    var id = $(e.currentTarget).data('story-source-id');
    Meteor.call('deleteStorySource', id);
  }
};

// We need current user in some places
Template.preferencesActivator.currentUser = UserSession.currentUser;
Template.admin.currentUser = UserSession.currentUser;
// Attach UI helpers to activators and modals
Template.preferencesActivator.events = UIHelpers.activatorEvents;
Template.preferencesPane.events = UIHelpers.formEvents;
