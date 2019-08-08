const express = require('express');
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
//const router = express.Router()
const path = require('path')

// app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.static(path.join((__dirname, './public'))))


app.get('/', (req, res, next) => {
  try{
    res.send('hello world')
  }
  catch(err){
    console.error(err)
  }
})



app.listen(3000, ()=> {console.log('app is running on port 5432')})

