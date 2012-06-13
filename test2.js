var enet=require("enet");

var addr = new enet.Address("0.0.0.0",5001);
var host = new enet.Host(addr,5);

var peer;

host.on("connect",function(peer,data){
	console.log("client connected!");
});

host.on("disconnect",function(peer,data){
	console.log("client disconnected. reconnecting");
	peer = host.connect( new enet.Address("127.0.0.1",5000), 5);
    console.log(peer.address().host(), peer.address().port());
});

host.on("message",function(peer,packet,channel,data){
	console.log(packet.data().toString(), "channel:",channel);
	console.log(peer.address().address(), peer.address().port());
});

host.on("telex",function(msg,rinfo){
    console.log("TELEX:",msg.toString(), "msg.length:",msg.length);   
    console.log("FROM:",rinfo);
});


host.start_watcher();
/*
peer = host.connect( new enet.Address("127.0.0.1",5000), 5);

setInterval(function(){
	try{
	 var packet=new enet.Packet("Hi!", enet.Packet.FLAG_RELIABLE);
	 peer.send(0,packet);
	}catch(e){}
},1000);
*/
