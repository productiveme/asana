Package.describe({
  name: 'productiveme:asana',
  version: '1.2.0',
  summary: 'Asana OAuth flow and client implementation of the Asana API',
  git: 'https://github.com/productiveme/asana.git',
  documentation: null
});

Npm.depends( {
  "asana" : "0.18.6"
} );

Package.onUse(function(api) {
  api.versionsFrom(['1.0','2.3']);
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('templating', 'client');
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Asana');

  api.addFiles(
    ['asana_configure.html', 'asana_configure.js'],
    'client');

  api.addFiles("asana-api.js", "server");

  api.addFiles('asana_common.js', ['client', 'server']);
  api.addFiles('asana_server.js', 'server');
  api.addFiles('asana_client.js', 'client');
});
