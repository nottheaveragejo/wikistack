const Sequelize = require('sequelize');
const SequelizeSlugify = require('sequelize-slugify');
const db = new Sequelize('postgres://localhost:5432/wikistack',{
    logging: false
});

const Page = db.define('page', {
    title : {
        type:Sequelize.STRING,
        allowNull: false,
        isAlphanumeric: true,
    },
    slug : {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    content:{
       type: Sequelize.TEXT,
        allowNull: false
    } ,
    status: Sequelize.ENUM('open','closed')
})

function generateSlug (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }

Page.beforeValidate((userInstance, optionsObject) => {
    userInstance.slug = generateSlug(userInstance.title)
})

// SequelizeSlugify.slugifyModel(Page, {
//     source: ['title']
// })

const User = db.define('user', {
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
        validate : {
            isEmail: true
        }

    }
})



module.exports = {
  db,
  Page,
  User
}

// const Sequelize = require('sequelize');
// const SequelizeSlugify = require('sequelize-slugify');
// const db = new Sequelize('postgres://localhost:5432/wikistack',{
//     logging: false
// });

// const Page = db.define('page', {
//    title : Sequelize.STRING,
//    slug : {
//        type: Sequelize.STRING,
//        unique: true
//    },
//    content: Sequelize.TEXT,
//    status: Sequelize.ENUM('open','closed')
// })
// SequelizeSlugify.slugifyModel(Page, {
//    source: ['title']
// })
// const User = db.define('user', {
//    name : Sequelize.STRING,
//    email: Sequelize.STRING
// })
// module.exports = {
//  db,
//  Page,
//  User
// }
