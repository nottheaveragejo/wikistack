const express = require('express');
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { db, Page, User } = require('./models');
const path = require('path')
const wiki = require('./routes/wiki')
const user = require('./routes/user')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join((__dirname, './public'))))

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use('/wiki', wiki)

app.get('/', (req, res, next) => {
  res.redirect('/wiki')
})


const PORT = 3000;
const init = async () => {
  await db.sync({force:false}); //drops database every time
  app.listen(PORT, ()=> {console.log(`app is running on port ${PORT}`)})
}

init();



