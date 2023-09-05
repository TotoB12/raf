const Request = require("request")
const http = require("http")
const fs = require("fs")
const token = process.env['token']
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

function send(channel, message) {  
  // 1132264639049252894  
  Request.post(`https://discordapp.com/api/v6/channels/${channel}/messages`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ "content": `${message}\n\n||*I am Slaycraft and I approve of this message.*||` })
    }, function(err, res, body) {
      console.log(err)
      console.log(body)
    })
}

app.post('/send', (req, res) => {
  const channel = req.body.channel;
  const message = req.body.message;
  const fs = require('fs');

  fs.appendFile('log.txt', `\`\`\`\n${message}\n\`\`\`\n\n`, function (err) {
  if (err) throw err;
  console.log('Saved!');
  });
  send(channel, message);
  res.redirect('/');
});

app.get('/', (req, res) => {
  fs.readFile('./index0.html', null, function (error, data) {
    if (error) {
        res.writeHead(404);
        res.write('Whoops! File not found!');
    } else {
        res.write(data);
    }
    res.end();
  });
});

app.listen(8000, () => {
    console.log(`Server is listening on port number: 8000`);
});
