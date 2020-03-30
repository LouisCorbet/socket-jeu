var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var n=1;
var given=[];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var numbertogive=0;
  var temp=0;
  while (numbertogive==0){
    temp++;
    if(given.indexOf(temp)<0){
      numbertogive=temp;
    }
  }
    socket.on('disconnect', function(){
      given = given.slice(0,given.indexOf(numbertogive)).concat(given.slice(given.indexOf(numbertogive)+1));
      io.emit('n', {'number':0, 'given':given});
    });
    given.push(numbertogive);
    io.emit('n', {'number':numbertogive,'given':given});
    n++;
  });

http.listen(3000, function(){
  console.log('listening on port 3000');
});