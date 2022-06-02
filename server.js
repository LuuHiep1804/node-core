const http = require('http');

const PORT = 5000;

http.createServer((req, res) => {
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.write("My Server!!!!");
    res.end();
}).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});