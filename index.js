const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const middleware = (req, res, next) => {
  if (req.query.idade !== undefined && req.query.idade.length > 0) {
    return next()
  } else {
    return res.redirect('/')
  }
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.get('/major', middleware, (req, res) => {
  return res.render('major', { idade: req.query.idade })
})

app.get('/minor', middleware, (req, res) => {
  return res.render('minor', { idade: req.query.idade })
})

app.post('/check', (req, res) => {
  if (req.body.idade >= 18) {
    return res.redirect('major/?idade=' + req.body.idade)
  } else {
    return res.redirect('minor/?idade=' + req.body.idade)
  }
})

app.listen(3000)
