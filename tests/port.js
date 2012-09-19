var enet=require("enet");

var _handlers = {
    connect: function(peer,data){
    	console.log("client connected. data=",data);
    },
    disconnect: function(peer,data){
    	console.log("client disconnected. data=",data);
    },
    message: function(peer,packet,channel,data){
    	console.log(packet.data().toString(), "channel:",channel,"data=",data);
    },
    telex: function(msg,rinfo){
        console.log("telex:",msg.toString());
    },
    packet: function(msg,rinfo){
        if(msg.toString() == "exit") process.exit();
        console.log("raw packet:",msg.toString());        
        
    }   
};

server = createHost("0.0.0.0",0,5,_handlers,function(host){
	console.log("_");
	server.send("127.0.0.1",5001,new Buffer("."));
},1000);

function createHost(ip,port,channels,handlers,tick,interval){
    var addr = new enet.Address(ip,port);
    var host = new enet.Host(addr,channels);
    
    host.on("connect",handlers.connect);
    host.on("disconnect",handlers.disconnect);
    host.on("message",handlers.message);
    host.on("telex",handlers.telex);
    host.on("packet",handlers.packet);
    host.on("ready",function(){
        console.log("HOST READY: listening on port:",host.address().port());
    });
    
    if(tick && interval){
        setInterval(function(){
            tick(host);
        },interval);
    }
    
    host.start_watcher();
        
    return host;
}
