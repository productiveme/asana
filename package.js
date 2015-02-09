Package.describe({
  name: 'productiveme:asana',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Asana OAuth flow and client implementation of the Asana API',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/productiveme/asana.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null
});

Npm.depends( {
  "asana-api-oauth" : "0.2.1"
} );

Package.on_use(function(api) {
  api.versionsFrom('1.0');
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('templating', 'client');
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Asana');

  api.add_files(
    ['asana_configure.html', 'asana_configure.js'],
    'client');

  api.add_files("asana-api.js", "server");

  api.add_files('asana_common.js', ['client', 'server']);
  api.add_files('asana_server.js', 'server');
  api.add_files('asana_client.js', 'client');
});