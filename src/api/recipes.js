/* eslint-disable no-unused-vars */
const router = require("express").Router();
const Recipe = require("../db/models/Recipe");
const User = require("../db/models/User");

let UserId = 1;

router.get("/", async (req, res, next) => {
  try {
    const recipe = await Recipe.findAll();
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const users = await Recipe.findOne({
      where: {
        id: req.params.id
      },
    })
    res.json(users)
  } catch(err) {
    next (err)
  }
})

router.post("/:id", async (req, res, next) => {
  try {
    let user = await User.findOne({Where: { id: 2 }});
    const recipeToSave = await Recipe.findOrCreate({
      where: { id: req.body.id },
    });
    let user_recipe = user.addRecipe(recipeToSave[0]);
    res.status(201).json(fridge);
  } catch (error) {
    next(error);
  }
});

module.exports = router;