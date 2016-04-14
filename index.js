var express = require('express');
app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//Escuchamos conexoines entrantes
io.on('connection',function(socket){
  //Detectamos eventos de mouse
  socket.on('mousemove', function(data){
    //Trasmitemos el moviemiento a los clientes conectados
    socket.broadcast.emit('move',data);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


