Asana.whitelistedFields = ['name','email','workspaces'];

OAuth.registerService('asana', 2, null, function(query) {

  var response = getTokens(query);
  var accessToken = response.accessToken;
  var identity = response.identity;

  var serviceData = {
    accessToken: accessToken,
    expiresAt: (+new Date) + (1000 * response.expiresIn),
    id: response.identity.id
  };

  var fields = _.pick(identity, Asana.whitelistedFields);
  _.extend(serviceData, fields);

  // only set the token in serviceData if it's there. this ensures
  // that we don't lose old ones (since we only get this on the first
  // log in attempt)
  if (response.refreshToken)
    serviceData.refreshToken = response.refreshToken;

  return {
    serviceData: serviceData,
    options: {profile: {name: identity.name}}
  };

});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
// - refreshToken, if this is the first authorization request
var getTokens = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'asana'});
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  var response;
  try {
    response = HTTP.post(
      "https://app.asana.com/-/oauth_token", {params: {
        code: query.code,
        client_id: config.clientId,
        client_secret: config.secret,
        redirect_uri: OAuth._redirectUri('asana', config), //Meteor.absoluteUrl("_oauth/asana?close"),
        grant_type: 'authorization_code'
      }});
  } catch (err) {
    throw new Error("Failed to complete OAuth handshake with Asana. " + err.message);
  }

  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Asana. " + response.data.error);
  } else {
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
      identity: response.data.data
    };
  }
};

