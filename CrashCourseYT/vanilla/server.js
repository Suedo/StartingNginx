// A simple no framework node.js server
const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.end("Gettings Root!");
        
    } else if (req.url === '/greet' && req.method === 'GET') {
        res.end("Hello User!");

    } else if ((req.url.match(/\/greet\/\w+/)) && req.method === 'GET') {
        const name = req.url.split('/')[2]
        res.end(`Gettings ${name}!`);

    } else if (req.url.match(/\/products\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        res.end(`Getting Product#${id}`);

    } else if (req.url === '/products' && req.method === 'GET') {
        res.end(JSON.stringify(["Apple", "Orange"]));

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))

    }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;
