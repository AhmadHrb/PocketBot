const xliff = require('xliff')
const fs = require('fs');

fs.readFile('./languages/ar.xliff', "utf8", async function (err, data) {
    if (err || data == "") return;
    else {
       xliff.xliff12ToJs(data,(err,data) => {
           console.log(data['resources']['/ban.js']['2'])
       })
    }
})