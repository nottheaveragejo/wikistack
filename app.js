const express = require('express');
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { db, Page, User } = require('./models');
const path = require('path')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join((__dirname, './public'))))

db.authenticate().
then(() => {
  console.log('connected to the database');
})


app.get('/', (req, res, next) => {
  try{
    res.send('hello there!')
  }
  catch(err){
    console.error(err)
  }
})

const PORT = 3000;
const init = async () => {
  await db.sync({force:true}); //drops database every time
  app.listen(PORT, ()=> {console.log(`app is running on port ${PORT}`)})
}

init();



