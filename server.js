const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server);

const messages = []

console.log(messages.length)  

io.on('connection', socket =>{
    console.log('connected');
    socket.on('disconnect',() =>{
        console.log("Disconnected");
    })
    socket.on('message',data =>{
        messages.push(data);
        socket.broadcast.emit('message',data);
    })
});

server.listen(8000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
console.log("Port 3000 active");
