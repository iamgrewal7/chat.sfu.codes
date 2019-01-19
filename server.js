const io = require('socket.io')();

io.on('connection', client =>{
    client.on('subscribeToTimer', (msg) =>{
        console.log(msg);
        setInterval(() =>{
            client.emit('timer',new Date());
        }, msg);
    });
});

const port = 8000
io.listen(port);
console.log("Port 8000 active");
