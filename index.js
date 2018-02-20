
var app = require('express')();
var protobuf = require('protobufjs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

//CLIENTSEITE
var protobuf = require("protobufjs/minimal");




//MAKE PUBLIC FOLDER
var express = require('express');
var path = require('path');
app.use("/public", express.static(path.join(__dirname, 'public')));




//TESTOBJECT
const TestMessage = require('./testmessage_pb');
var message = new proto.TestMessage();
message.setSometext('Hello Protocol Buffers');
var bytes = message.serializeBinary();
var buf=new Buffer(bytes.length);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
    

io.on('connection', function(socket){
  socket.on('message', function(msg){
    console.log('message: ' + msg);
	console.log(bytes);
	
	var message2 = proto.TestMessage.deserializeBinary(bytes);
	console.log(message2.getSometext());
	
	
  });
  
  socket.on('data', function(msg){
    console.log('data: ' + msg);
	socket.emit('news', bytes);
	
	
  }  );
  
    socket.on('databin', function(msg){
    console.log('databin: ' + msg);
	socket.emit('databin', bytes);
	
	
  } );
  

  
  
  
  
  
  
});
    