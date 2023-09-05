const Request = require("request")
const http = require("http")
const fs = require("fs")
const token = process.env['token']

// Function to get current time in HH:MM:SS format in EST
function getCurrentTime() {
  const date = new Date()
  const estTime = date.toLocaleString("en-US", { timeZone: "America/New_York", hour12: false })
  return estTime.split(" ")[1].slice(0, -3)
}

// Function to get a random word from bad.txt file
function getRandomWord() {
  const words = fs.readFileSync('bad.txt', 'utf-8').split('\n')
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

// Set interval to send message every minute
setInterval(function() {
  const currentTime = getCurrentTime()
  const randomWord = getRandomWord()
  const binaryWord = randomWord.split('').map(char => char.charCodeAt(0).toString(2)).join(' ')
  const message = `${currentTime}\n${binaryWord}`
  Request.post("https://discordapp.com/api/v6/channels/1055241483952853065/messages", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ "content": message })
  }, function(err, res, body) {
    console.log(err)
    console.log(body)
  })
}, 60000)

// Start the server listening on port 5000
server.listen(5000, "0.0.0.0", function() {
  console.log("Server is listening on port 5000")
})
