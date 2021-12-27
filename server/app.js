const express = require('express')
const fs = require('fs-extra')
const path = require('path')
const cookieParser = require('cookie-parser')
const apiV1 = require('./routes/apiV1')
const Logger = require('./lib/Logger')
const bodyParser = require('body-parser')
const cors = require('cors')

process.on('uncaughtException', function (error) {

  Logger.error(error.message)
  Logger.error(error.stack)

  // if(!error.isOperational)
  //   process.exit(1)
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
    return getSource('503')
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


app.use('/:anything', function (req, res, next) {
  let v = req.params.anything
  // uncomment when ready to activate them
  console.log(v)
  if (/neo-anti/.test(req.hostname)) {
    // if (v === 'the-guild-manifest-104') {
    //   return res.send(getSource('the-guild-manifest-104'))
    // }
    // if (v === 'look-out-for-yourself') {
    //   return res.send(res.redirect('look-out-for-yourself'))
    // }
  } else {
    // if (v === 'all-the-ravens') {
    //   return res.send(getSource('all-the-ravens'))
    // }
    // if (v === 'we-hacked-you-stupid') {
    //   return res.send(getSource('we-hacked-you-stupid'))
    // }
    // if (v === 'agdaroth+cries+fire') {
    //   return res.send(getSource('agdaroth+cries+fire'))
    // }
  }
  next()
})

app.use(express.static(path.resolve(__dirname, '../public')))

app.use(function (req, res, next) {
  res.send(`<!doctype html><title>404 Not Found</title><h1 style="text-align: center">404 Not Found</h1>`)
})

// if (app.get('env') === 'development') {
//   app.use((err, req, res, next) => {
//     res.status(err.status || 500).json({
//       title: 'Error',
//       message: err.message,
//       error: err
//     })
//   })
// }
//
// // error handler
// app.use(function (err, req, res, next) {
//
//   console.debug(err)
//   console.debug(err.status)
//   console.debug(err.message)
//
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}
//
//   // render the error page
//   res.status(err.status || 500)
//   res.json({error: 'Error'})
// })
//
// app.closeDb = () => {
//   // if (db.isOpen()) {
//   //   db.close()
//   // }
// }

module.exports = app

