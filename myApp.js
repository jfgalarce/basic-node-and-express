let express = require('express');
const res = require('express/lib/response');
require('dotenv').config()
let bodyParser = require('body-parser')
let app = express();
const absolutePath = __dirname + '/views/index.html';


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
    const m = process.env.MESSAGE_STYLE;
    res.json({ "message": m == 'uppercase' ? 'HELLO JSON' : 'Hello json' })
})

app.get('/now',(req,res,next)=>{
    req.time=new Date().toString()
    next()
}, (req,res)=>{
    res.json({ "time": req.time })
})

app.get('/:word/echo',(req,res)=>{
    res.json({ "echo": req.params.word })
})

app.get('/name', (req,res)=>{
    const {first, last} = req.query;
    res.json({ "name": `${first} ${last}` })
})

app.post('/name', (req,res)=>{
    console.log(req.body)
    const {first, last} = req.body;
    res.json({ "name": `${first} ${last}` })
})
 // https://3000-freecodecam-boilerplate-zqrpdamvilr.ws-us117.gitpod.io/name?first=juan&last=galarce



































module.exports = app;
