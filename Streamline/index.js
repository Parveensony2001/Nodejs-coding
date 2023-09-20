const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    // 1st without streaming
    // fs.readFile('index.txt', (err, data) => {
    //     if(err){
    //         return console.error(err);
    //     }
    //     res.end(data.toString());
    // })
    // 2nd way
    const readStream = fs.createReadStream('index.txt');
    // readStream.on("data", (chunkData) => {
    //     res.write(chunkData);
    // })
    // readStream.on("end", () => {
    //     res.end()
    // })
    // readStream.on("error", (err) => {
    //     console.log(err);
    //     res.end('File not found');
    // })
    // 3rd way
    readStream.pipe(res);
})


server.listen(8000, '127.0.0.1')