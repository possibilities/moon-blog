Stories = new Meteor.Collection('stories');
Blog = new Meteor.Collection('blogs');

Secure.noDataMagic('stories');
Secure.noDataMagic('blogs');

Stories.remove({});
Blog.remove({});

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

Stories.insert({
  title: "Moofy Marf Get Doof'd",
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  publishedAt: new Date(),
  author: 'Mike Bannister'
});

Stories.insert({
  title: "Woofy Dog Got a Cat",
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  publishedAt: new Date(),
  author: 'Mike Bannister'
});
