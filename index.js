const express = require('express');
const request = require('request');
const app = express();
let port = 8080;
const regex = /id: ([A-Za-z0-9]{10})\s?/g;

const argv = require('minimist')(process.argv.slice(2));

// Parse arguments
const environment = argv.env || argv.environment || 'qas';
port = argv.port || port;
const path = environment.toUpperCase() === 'PRD' ? '/pid-prod' : '/pid-qas';
const pidUrl = argv.url;

if (argv.help) {
    console.log('Usage: \nnode index.js --env=qas --port=8080 --url=http://example.com\n\nArguments:\n\t--port:\t\tthe port to listen on\n\t--env: \t\tthe environment to use (decides /pid-prod or /pid-qas)\n\t--url:\t\tthe url to call');
} else {
    if (pidUrl === undefined) {
        throw ('Argument url must be filled in!');
    }

    console.log('Environment is ' + environment + '. Listening on ' + path + '.');

    app.get(path, (req, res) => {
        const nrOfPids = req.query.number !== undefined && req.query.number !== '' ? req.query.number : 1;
        console.log('Requested ' + nrOfPids + ' pids');
        request(pidUrl + '+' + nrOfPids, {json: false}, (err, response, body) => {
            if (err) {
                res.status(500).send({message: err});
            }
            let result = [];
            let counter = 0;
            const resultCount = (body.match(/id: /g) || []).length;
            const pids = body.split(regex).filter(function(el) {return el.length != 0 && el !== '\n'})
            if (nrOfPids.toString() !== resultCount.toString()) {
                res.status(500).send({message: body});
            }
            else {
                for (const pid of pids) {
                    counter += 1;
                    result.push({number: counter, id: pid});
                }
                res.status(200).send(result);
            }
        });
    });

    app.listen(port, () => console.log('PID service is listening on port', port));
}