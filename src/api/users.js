const router = require("express").Router();
const User = require("../db/models/User");
// const { checkAuth } = require('../auth-middleware');

  router.get('/', async (req, res, next) => {
    try {
      const users = await User.findAll({
        attributes: ['uid', 'firstName', 'lastName', 'email']
      })
      res.json(users)
    } catch (err) {
      next(err)
    }
  })

  // GET /users/:id
  router.get('/:id', async (req, res, next) => {s
    try {
      const users = await User.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['uid', 'firstName', 'lastName', 'email', 'myFav',]
      })
      res.json(users)
    } catch(err) {
      next (err)
    }
  })

  // DELETE / users/:id
  router.get('/:id', async (req, res, next) => {
    try {
      const userToDelete = await User.findByPk(req.params.id);
      await userToDelete.destroy()
      res.json(userToDelete)
    } catch(err) {
      next (err)
    }
  })


  router.post('/', async (req, res, next) => {
    try {
      res.json(await User.create(req.body));
    } catch (error) {
      next(error);
    }
  });


  router.put('/:id', async (req, res, next) => {
    try {
      const userToUpdate = await User.findByPk(req.params.id);
      res.json(await userToUpdate.update(req.body));
    } catch (error) {
      next(error);
    }
  });


  module.exports = router;

