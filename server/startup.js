Meteor.startup(function () {
  //Meteor.call("pushSession");
  //Meteor.call("sessionData");
  Meteor.call("lightstreamerConnect")
});