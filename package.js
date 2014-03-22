Package.describe({
  summary: "Asana OAuth flow and client implementation of the Asana API"
});

Npm.depends( {
  "asana-api-oauth" : "0.2.1"
} );

Package.on_use(function(api) {
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