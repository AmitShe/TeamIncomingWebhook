const config = require('./config.js')
const prompt = require('prompt')
const fs = require("fs");

prompt.start();

prompt.get(['message'], function (err, result) {
    const axios = require('axios')

    const instance = axios.create();
    instance.defaults.headers.post['Content-Type'] = 'application/json';

    const contents = fs.readFileSync('./card.json');
    card = JSON.parse(contents)
    card.sections[0].facts[0].value = result.message

    instance
        .post(config.WEBHOOK_URL, JSON.stringify(card))
        .then(res => {
            console.log(`statusCode: ${res.status}`)
            // console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
})
