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

var client = require("dgram").createSocket("udp4");
client.bind("0.0.0.0",5001);

server = createHost("0.0.0.0",5000,5,_handlers,function(host){
	console.log("_");
},100);

setTimeout(function(){
    sendRawPacket(client,'{}',5000,"127.0.0.1");
    sendRawPacket(client,"TEST PASSED!",5000,"127.0.0.1");
    sendRawPacket(client,"exit",5000,"127.0.0.1");
},100);

setTimeout(function(){
	console.log("Raw Packets are not intercepted!");
	process.exit();
},1000);
/*
setInterval(function(){
    client.send(new Buffer("Hello!"),0,5,5000,"127.0.0.1");
     var telex = new Buffer(JSON.stringify({
        '+end':'123213...',
        '_to':'172.16.200.1:42424'
    }), "utf8");
    client.send(telex,0,telex.length,5000,"127.0.0.1");
},2000);
*/

function createHost(ip,port,channels,handlers,tick,interval){    
    var addr = new enet.Address(ip,port);
    var host = new enet.Host(addr,channels);
    
    host.on("connect",handlers.connect);
    host.on("disconnect",handlers.disconnect);
    host.on("message",handlers.message);
    host.on("telex",handlers.telex);
    host.on("packet",handlers.packet);
    
    if(tick && interval){
        setInterval(function(){
            tick(host);
        },interval);
    }
    
    host.start_watcher();
        
    return host;
}
function sendRawPacket(socket,msg,port,ip){
    var buf = new Buffer(msg);
    socket.send(buf,0,buf.length,port,ip);
}
