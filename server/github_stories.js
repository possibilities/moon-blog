_.mixin(_.string.exports());

GitHubStories = function(params) {
  this.user = params.user;
  this.repo = params.repo;
  // API setup
  this.baseUri = 'api.github.com';
  this.ssl = true;
};
_.extend(GitHubStories.prototype, Party.prototype);

GitHubStories.prototype.stories = function(ref) {
  ref = ref || 'master';
  var sha = this._ref(ref).sha;
  var rootTree = this._tree(sha);
  var rawStories = this._storiesForTree(rootTree);
  var stories = this._prepareStories(rawStories);
  return stories;
};

GitHubStories.prototype._storiesForTree = function(dirTree) {
  var self = this;

  var storiesTree = _.find(dirTree, function(tree) {
   return tree.path === 'stories';
  });
  var stories = this._tree(storiesTree.sha);
  return _.map(stories, function(story) {
    story.raw = self._rawStory(story.sha);
    return story;
  });
};

GitHubStories.prototype._prepareStories = function(rawStories) {
  var self = this;

  return _.map(rawStories, function(rawStory) {
    var story = self._prepareStory(rawStory.raw);
    return _.extend(story, {
      path: rawStory.path,
      sha: rawStory.sha
    });
  });
};

GitHubStories.prototype._prepareStoryMeta = function(rawHeader) {
  rawHeader = _.trim(rawHeader, '---');
  return jsyaml.load(rawHeader);
};

GitHubStories.prototype._prepareStory = function(rawStory) {
  var markdownHeaderRE = /---(.|\n)*---/m;
  var markdownHeader = _.first(markdownHeaderRE.exec(rawStory));
  var storyMeta = this._prepareStoryMeta(markdownHeader);
  var body = rawStory.substr(markdownHeader.length);

  return {
    body: _.trim(body, '\n'),
    publishedAt: new Date(storyMeta.date),
    title: storyMeta.title,
    author: 'Mike Bannister'
  };
};

GitHubStories.prototype._ref = function(ref) {
  return this.get('repos/' + this.user + '/' + this.repo + '/git/refs/heads/' + ref).object;
};

GitHubStories.prototype._tree = function(sha) {
  return this.get('repos/' + this.user + '/' + this.repo + '/git/trees/' + sha).tree;
};

GitHubStories.prototype._blob = function(sha) {
  return this.get('repos/' + this.user + '/' + this.repo + '/git/blobs/' + sha).content;
};

GitHubStories.prototype._rawStory = function(sha) {
  var content = this._blob(sha);
  return new Buffer(content, 'base64').toString();
};
