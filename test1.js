var enet=require("enet");

var addr = new enet.Address("0.0.0.0",5000);
var host = new enet.Host(addr,5);

var peer;


host.on("connect",function(peer,data){
	console.log("client connected! data=",data);
});

host.on("disconnect",function(peer,data){
	console.log("client disconnected. data=",data);

});

host.on("message",function(peer,packet,channel,data){
	console.log(packet.data().toString(), "channel:",channel,"data=",data);
});

host.on("telex",function(msg,rinfo){
    console.log("TELEX:",msg.toString(),"length:",msg.length);    
    console.log("FROM:",rinfo );
});

host.start_watcher();

setInterval(function(){

    var buf = new Buffer(JSON.stringify({
        '+end':'123213...',
        '_to':'172.16.200.1:42424'
    })+ '\n', "utf8");

    host.send("127.0.0.1", 5001, buf);

},1000);


peer=host.connect( new enet.Address("127.0.0.1",5001), 5, 1337);

setInterval(function(){
	try{
	 var packet=new enet.Packet("Hello!", enet.Packet.FLAG_RELIABLE);
	 peer.send(0,packet);
	}catch(e){
	    console.log(e);
	}
},3000);


