const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, {'content-Type': "text/plain"})
    response.end("hello world")
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)