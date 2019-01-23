const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server);

io.on('connection', client =>{
    client.on('subscribeToTimer', (msg) =>{
        console.log(msg);
        setInterval(() =>{
            client.emit('timer',new Date());
        }, msg);
    });
});

server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
console.log("Port 3000 active");
