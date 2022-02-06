const express = require('express')
const path = require('path')
const fs = require('fs-extra')
const ethers = require('ethers')
const cookieParser = require('cookie-parser')
const apiV1 = require('./routes/apiV1')
const Logger = require('./lib/Logger')
const bodyParser = require('body-parser')
const cors = require('cors')

process.on('uncaughtException', function (error) {

  Logger.error(error.message)
  Logger.error(error.stack)

  // if(!error.isOperational) {
  //   process.exit(1)
  // }
})

let indexes = {}

function getSource(what) {
  if (!indexes[what]) {
    indexes[what] = fs.readFileSync(path.resolve(__dirname, `../pages/${what}.html`), 'utf-8')
  }
  return indexes[what]
}

function getIndex(req) {
  if (/neo-anti/.test(req.hostname)) {
    return getSource('namecheap')
  } else {
    if (process.env.BLACK) {
      return getSource('black')
    } else {
      return getSource('503')
    }
  }
}

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

app.use('/api/v1', apiV1)
// app.use('/metadata', metadata)


app.get('/', function (req, res, next) {
  res.send(getIndex(req))
})

function getS3Image(req) {
  let ip = req.headers['x-real-ip'].split('')
  let img = `map${ip.pop()}.jpg`
  let hash = ethers.utils.id(img)
  return hash.substring(4, 16)
}

app.use('/:anything', function (req, res, next) {
  let v = req.params.anything
  if (/neo-anti/.test(req.hostname)) {
    if (v === 'the-guild-manifest-104') {
      return res.send(getSource('the-guild-manifest-104'))
    }
    if (v === 'look-out-for-yourself') {
      return res.send(getSource('look-out-for-yourself'))
    }
    if (v === 'favicon.ico') {
      res.send(`<!doctype html><title>404 Not Found</title><h1 style="text-align: center">404 Not Found</h1>`)
    }
  } else {
    if (v === 'all-the-ravens') {
      return res.send(getSource('all-the-ravens'))
    }
    if (v === 'agdaroth+cries+fire') {
      let source = getSource('agdaroth+cries+fire')
      let image = getS3Image(req)
      return res.send(source.replace(/0000/, image))
    }
    if (v === 'favicon.ico') {
      return res.sendFile(path.resolve(__dirname, '../pages/favicon.ico'))
    }
  }
  next()
})

app.use(express.static(path.resolve(__dirname, '../public')))

app.use(function (req, res, next) {
  res.send(`<!doctype html><title>404 Not Found</title><h1 style="text-align: center">404 Not Found</h1>`)
})

module.exports = app

