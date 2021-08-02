// A simple no framework node.js server
const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log(`Server:${PORT} :: req :: ${req.url}`)
    if (req.url === '/' && req.method === 'GET') {
        makeGetCall('http://localhost:3000/greet/robocop/')
        res.end(`${PORT} :: Gettings Root!`);
    } else if (req.url === '/greet' && req.method === 'GET') {
        res.end(`${PORT} :: Hello User!`);

    } else if ((req.url.match(/\/greet\/\w+/)) && req.method === 'GET') {
        const name = req.url.split('/')[2]
        res.end(`${PORT} :: Gettings ${name}!`);
    } else if (req.url.match(/\/products\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[2]
        res.end(`${PORT} :: Getting Product#${id}`);

    } else if (req.url === '/products' && req.method === 'GET') {
        res.end(`${PORT} :: \n${JSON.stringify(["Apple", "Orange"])}`);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(`${PORT} :: \n${JSON.stringify({ message: 'Route Not Found' })}`)

    }
})

function makeGetCall(uri) {
    http.get(uri, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(`${PORT} :: data: ${data}`);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;
