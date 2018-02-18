const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 4049;
const Archiver = require('archiver');

const routesPrefix = '/api';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(`${routesPrefix}/zip/`, function(request, response) {
    // const { contract, testCases } = request.body;
    let contract = "contract { }"
    let testCases = "test.assert"

    response.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=astronaut.zip'
    });

    let zip = Archiver('zip');

    zip.pipe(response);

    zip.glob('')

    zip.directory('../modules/spaceman/reactapp/', 'reactapp');

    zip.append(contract, { name: 'reactapp/truffle/contracts/astronaut.sol' })

    zip.append(testCases, { name: 'reactapp/truffle/tests/astronaut.js' })

    zip.finalize();
});

app.listen(port, () => console.log(`I'm alive on port ${port}!`))
