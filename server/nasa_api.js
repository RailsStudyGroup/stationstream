/** Methods to interact with nasa push lightstream server **/
Meteor.methods({
  /* Open a session stream with nasa's server */
  pushSession : function() {
    this.unblock();
    return Meteor.http.call("GET", "http://push1.jsc.nasa.gov/lightstreamer/create_session.js?LS_domain=nasa.gov&LS_client_version=5.0&LS_adapter_set=PROXYTELEMETRY");
  },
  /* modify what data we get back */
  sessionData : function() {
   this.unblock();
   return Meteor.http.call("GET", "http://push1.jsc.nasa.gov/lightstreamer/control.txt?LS_session=Sfa9420df22498cb5T0716411&LS_id=ISPWebItem&LS_schema=utc%20utcyear&LS_mode=RAW&LS_op=add&LS_table=1");
  },
  lightstreamerConnect: function() {
    var lightstreamer = Meteor.npmRequire('lightstreamer-client');
    var lsClient = new lightstreamer.LightstreamerClient("http://push.lightstreamer.com","ISSLIVE");  
    lsClient.connect();
    var testSubscription = new lightstreamer.Subscription("MERGE",["USLAB000025"],["USLAB000025"]);
    testSubscription.setDataAdapter("PROXYTELEMETRY");
    testSubscription.setRequestedSnapshot("yes");
    lsClient.subscribe(testSubscription);
    lsClient.addListener({
      onStatusChange: function(newStatus) {         
        console.log(newStatus);
      }
    });
    testSubscription.addListener({
      onSubscription: function() {
        console.log("SUBSCRIBED");
      },
      onUnsubscription: function() {
        console.log("UNSUBSCRIBED");
      },
      onItemUpdate: function(obj) {
        console.log(obj.getValue("USLAB000025") + ": " + obj.getValue("USLAB000025"));
      }
    });
  }
});