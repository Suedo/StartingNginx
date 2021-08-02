// A simple no framework node.js server
const http = require('http');
const PORT = process.env.PORT || 3000;
const BOX_NAME = process.env.BOX_NAME || "default";

const id = `${BOX_NAME}:${PORT}`;

const server = http.createServer((req, res) => {
    console.log(`Server:${id} :: req :: ${req.url}`)
    let response = "";
    if (req.url === '/' && req.method === 'GET') {
        console.log(`${id} :: At root, going to appbox!`);
        makeGetCall('http://nginx_appbox:8000/app', res);

    } else if (req.url === '/app' && req.method === 'GET') {
        console.log(`${id} :: going to dbbox!`);
        makeGetCall('http://nginx_dbbox:8010/db', res);

    } else if (req.url === '/db' && req.method === 'GET') {
        res.end(`${id} :: end of journey!`);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(`${id} :: \n${JSON.stringify({ message: 'Route Not Found' })}`)
    }
})

function makeGetCall(uri, res) {
    let retval = "";
    http.get(uri, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            retval = `${id}:: response: [ ${data} ]`;
            // webbox1:3001:: response: [ appbox1:8001:: response: [ dbbox1:8011 :: end of journey! ] ]
            res.end(retval);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    return retval;
}

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;
