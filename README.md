Reland Drum Machine
===================

Reland is a collaborative drum machine powered by [relay.io][0]. It's a good example of how easy and how versatile
relay is. The entire thing is powered by client side javascript!

Hooking it all up is super simple:

Add a script tag to get access to your relay object:
    <script src='http://api.relay.io/client/24820E7E-9793-476A-9E58-5145E0DC0DEC.js' type='text/javascript'></script>

Next, create the relay object:
    var relay = new RelayClient("24820E7E-9793-476A-9E58-5145E0DC0DEC");

To use the relay object and your insert key to send a json message:
    var insertMessage = function(messagejson){
      // insert your json message into the relay
      relay.insert("654401F2-23A7-45AB-BBA1-DAB1103D0A6F", messagejson);
    };

To use the relay object to render incoming messages:
    relay.getUpdates(function(item){
      // do something when you receive a message from relay
      selectPad(item);
    });

[0]: http://relay.io