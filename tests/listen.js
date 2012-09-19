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
        if(msg.toString() == "exit\n") process.exit();
        console.log("raw packet:",msg.toString());                
    }   
};

server = createHost("0.0.0.0",0,5,_handlers,function(host){
	if(online) console.log("_");
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
        online = true;
    });
    if(tick && interval){
        setInterval(function(){
            tick(host);
        },interval);
    }
    
    host.start_watcher();
        
    return host;
}
