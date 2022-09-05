Asana = Npm.require("asana");

Asana.createClient = (options) => {
  const {
    oauth: {
      clientId,
      clientSecret,
      accessToken,
      refreshToken,
      redirectUrl,
    },
  } = options;
  const client = Asana.Client.create({
    clientId,
    clientSecret,
    redirectUri: redirectUrl,
  });
  client.useOauth({
    credentials: {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  });
  client.request = client.dispatcher.dispatch;
  return client;
};