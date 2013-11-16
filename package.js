Package.describe({
  summary: "Asana OAuth flow and client implementation of the Asana API"
});

Npm.depends( { 
  "asana-api" : "0.2.0" 
} );

Package.on_use(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');

  api.add_files(
    ['asana_configure.html', 'asana_configure.js'],
    'client');

  api.add_files("asana-api.js", "server");
  if(api.export) api.export('asana');

  api.add_files('asana_common.js', ['client', 'server']);
  api.add_files('asana_server.js', 'server');
  api.add_files('asana_client.js', 'client');
});