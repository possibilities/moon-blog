Package.describe({
  summary: "Attach users to client-sessions"
});

Package.on_use(function (api) {
  // Dependencies
  api.use('templating', 'client');
  api.use('bootstrap', 'client');
  api.use('user-sessions', ['client', 'server']);
  api.use('simple-secure', 'server');
  api.use('party', 'server');
  // Vendored
  api.add_files('vendor/js-yaml.js', 'server');
  api.add_files('vendor/underscore.string.js', 'server');
  api.add_files('vendor/moment.js', 'client');
  // Resources
  api.add_files('templates.html', 'client');
  api.add_files('styles.css', 'client');
  // Scripts
  api.add_files('sources/github.js', 'server');
  api.add_files('client.js', 'client');  
  api.add_files('server.js', 'server');
});
