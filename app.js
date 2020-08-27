const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

app.set("appName", "Call Service EMI")
app.set("port", process.env.PORT || 4007)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//my web page
//routes
require('./routes/index') (app)


app.listen(app.get("port"), () => {
    console.log(app.get("appName"))
    console.log("Server on port", app.get("port"))
})