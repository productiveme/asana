// Request Asana credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Asana.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'asana'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.id();

  var loginUrl =
        'https://app.asana.com/-/oauth_authorize' +
        '?response_type=code' +
        '&client_id=' + config.clientId +
        '&redirect_uri=' + Meteor.absoluteUrl('_oauth/asana?close') +
        '&state=' + credentialToken;

  Accounts.oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};