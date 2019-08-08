let express = require('express');
const expressRouter = express.Router();
const {addPage } = require('../views')
const wikipage = require('../views/wikipage')
const indexpage = require('../views/index')
const { Page } = require('../models')


expressRouter.get('/', (req, res, next) => {

  const allpages = Page.findAll();
  res.send(allpages)
})
expressRouter.post('/', async(req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  // const page = await Page.create({
  //   title: req.body.title,
  //  content: req.body.content
  // })

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    const result = await page.save();
    console.log(result)
    res.redirect(`/wiki/${result.slug}`);
  } catch (error) { next(error) }
  //res.send(res.json(req.body))
})

expressRouter.get('/add', (req, res, next) => {
  res.send(addPage())

})

expressRouter.get('/:slug', async (req, res, next) => {
  // res.send(`hit dynamic route at ${req.params.slug}`);
  const singlePage = await Page.findOne({
    where: {slug : req.params.slug}
  })
  res.send(wikipage(JSON.parse(JSON.stringify(singlePage)), 'Lisa'))
  //res.send(singlePage)
})
module.exports = expressRouter
