const express = require('express')
const app = express() 
const port = process.env.PORT || 1024
const bodyParser = require('body-parser')
const cors = require('cors')

const handlebars = require('express-handlebars');

app.use(bodyParser({extended: false}))

app.use(express.json())
app.use(cors());
app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));

app.get( '/', ( req, res ) => res.render( 'form' ) )

const client = require('@jsreport/nodejs-client')('http://localhost:5488');

app.post( '/form_post',  ( req, res , next) => {
    client
    .render({
      template: {
        shortid:'8dcpXx2j6',
        recipe: 'html',
        engine: 'handlebars'
      },
      data: JSON.parse(JSON.stringify(req.body))})
    .then(response => response.pipe(res))
    .then(console.log('test', req.body))
    .catch(next)
})

app.use( ( req, res ) => res.status( 404 ).render( '404' ) )
app.use( ( err, req, res, next ) => res.status( 500 ).render( 500 ) )

app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
  })