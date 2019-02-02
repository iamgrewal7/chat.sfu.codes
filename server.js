var AWS  = require('aws-sdk');
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server);

const messages = []

// AWS.config.update({
//     region: "us-east-2",
//     accessKeyId: "AKIAJ57U7P6OM2J2YTDA",
//     secretAccessKey: "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"
//   });
// var docClient = new AWS.DynamoDB.DocumentClient();
// var params = {
//     TableName: 'Chats',
//   }
// docClient.scan(params,onScan);
// function onScan(err, data){
//     if (err) {
//         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         // print all the movies
//         console.log("Scan succeeded.");
//         data.Items.forEach( message => {
//           messages.push(message)
//         });

//         // continue scanning if we have more movies, because
//         // scan can retrieve a maximum of 1MB of data
//         if (typeof data.LastEvaluatedKey != "undefined") {
//             console.log("Scanning for more...");
//             params.ExclusiveStartKey = data.LastEvaluatedKey;
//             docClient.scan(params, onScan);
//         }
//     }
//   }

console.log(messages.length)  

io.on('connection', socket =>{
    console.log('connected');
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
