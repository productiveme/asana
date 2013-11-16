Template.configureLoginServiceDialogForAsana.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForAsana.fields = function () {
  return [
    {property: 'appId', label: 'Client ID'},
    {property: 'secret', label: 'Client secret'}
  ];
};