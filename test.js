const fs = require('node:fs');
const request = require('request');
request('https://nodejs.org/docs/latest/api/documentation.json', (error, request, body) => {
// console.log(body);
fs.writeFileSync('./docs.json', body)

})


// console.log("Hello");
fs.writeFileSync('./config.txt', 'HELLO NODE.js...')