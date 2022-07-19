// server.js
// ref→[Custom Server](https://github.com/vercel/next.js/blob/canary/examples/custom-server-express/server.js)
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
console.log(`> Start up parameters => NODE_ENV:${process.env.NODE_ENV}, PORT:${port}`)
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})