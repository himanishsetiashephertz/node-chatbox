var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var client = 0
io.on('connection', function(socket){
    client++;
    io.emit('broadcast',client)

    socket.on('user',function(msg){
        console.log("User : "+msg+" connected.")
        io.emit('join',msg)
    })

    socket.on('disconnect',function(){
        client--;
        io.emit('disconnected',client)
    })

    socket.on('message',function(msg){
        console.log("Message : "+msg)
        io.emit('message',{"message":msg.message,"name":msg.name})
    })
});



http.listen(port, function(){
  console.log('listening on *:3000');
});