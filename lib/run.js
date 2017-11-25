'use strict'

const path = require('path');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const defaultHeader = require(path.join(__dirname, '..', 'config', 'headers'))

function run(task, cb) {
  //  Main Run
  const url = new URL(task.url)
  const headers = Object.assign({}, defaultHeader, {
    Host: url.host
  }, task.headers)
  const options = Object.assign({
    method: task.method || 'get',
    host: url.host,
    path: url.pathname,
    timeout: 5000,
    headers
  }, task.options)

  const { protocol } = url
  const request = protocol.indexOf('https') !== -1 ? https : http //  just for HTTP or HTTPS

  const req = request.request(options, (res) => {
    let data = Buffer.alloc(0)
    res.on('data', (chunk) => {
      data = Buffer.concat([data, chunk])
    })
    res.on('end', () => {
      console.log('Receive data')
      cb(null, data)
    })
  })
  req.on('error', (err) => {
    cb(err)
  })

  if (task.data) {
    req.write(task.data)
  }
  req.end()
}

module.exports = run
