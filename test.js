var enet=require("enet");

var _peer, server, client;

var _handlers = {
    connect: function(peer,data){
    	console.log("client connected. data=",data);
    },
    disconnect: function(peer,data){
    	console.log("client disconnected. data=",data);
    	process.exit();
    },
    message: function(peer,packet,channel,data){
    	console.log(packet.data().toString(), "channel:",channel,"data=",data);
    },
    telex: function(msg,rinfo){
        console.log("telex:",msg.toString());   
        console.log("from:",rinfo);
       	_peer.disconnect();
    }    
};

server = createHost("0.0.0.0",5000,5,_handlers,function(host){

    if(_peer) {
        try{
    	 var packet=new enet.Packet("Hello!", enet.Packet.FLAG_RELIABLE);
    	 _peer.send(0,packet);
    	}catch(e){
    	    console.log(e);
    	}
    }
},1000);

client = createHost("0.0.0.0",5001,5,_handlers,function(host){

    var buf = new Buffer(JSON.stringify({
        '+end':'123213...',
        '_to':'172.16.200.1:42424'
    }), "utf8");

    host.send("127.0.0.1", 5001, buf);
    
},2000);

_peer=server.connect( new enet.Address("127.0.0.1",5001), 5, 1337);

function createHost(ip,port,channels,handlers,tick,interval){    
    var addr = new enet.Address(ip,port);
    var host = new enet.Host(addr,channels);
    
    host.on("connect",handlers.connect);
    host.on("disconnect",handlers.disconnect);
    host.on("message",handlers.message);
    host.on("telex",handlers.telex);
    
    if(tick && interval){
        setInterval(function(){
            tick(host);
        },interval);
    }
    
    host.start_watcher();
        
    return host;
}

