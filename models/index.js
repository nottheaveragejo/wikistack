const Sequelize = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const db = new Sequelize('postgres://localhost:5432/wikistack',{
    logging: false
});

const Page = db.define('page', {
    title : Sequelize.STRING,
    slug : {
        type: Sequelize.STRING,
        unique: true
    },
    content: Sequelize.TEXT,
    status: Sequelize.ENUM('open','closed')
})

SequelizeSlugify.slugifyModel(Page, {
    source: ['title']
})

const User = db.define('user', {
    name : Sequelize.STRING,
    email: Sequelize.STRING
})



module.exports = {
  db,
  Page,
  User
}

