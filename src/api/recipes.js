const router = require("express").Router();
const Recipe = require("../db/models/Recipe");
const User = require("../db/models/User");



router.get("/", async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

router.get("/:recipeId", async (req, res, next) => {
  try {
    console.log(req.params.recipeId);
    const recipe = await Recipe.findOne({
      where: { id: req.params.recipeId },
    });
    if (!recipe) {
      res.status(404).send("Sorry this recipe doesn't exist!");
    } else {
      res.json(recipe);
    }
  } catch (err) {
    next(err);
  }
});


router.get("/user/:userUid", async (req, res, next) => {
  try {
    const userFav = await User.findOne({
      where: { uid: req.params.userUid },
      attributes: ["uid"],
      include: [
        {
          model: Recipe,
          attributes: ["id", "recipe_name", "imageUrl"],
          required: true,
        },
      ],
    });
    res.json(userFav);
  } catch (error) {
    next(error);
  }
});



router.post("/:userUid", async (req, res, next) => {
  try {
    //console.log("reqparams from save route", req.body, "userUID is:", req.params.userUid)
    let user = await User.findOne({ where: { uid: req.params.userUid } });
    const recipeToSave = await Recipe.findOrCreate({
      where: { recipe_name: req.body.recipeName, id: req.body.recipeId, imageUrl: req.body.image },
    });
    let user_recipe = user.addRecipe(recipeToSave[0], {
      through: { isfav: true },
      
    });
    res.status(201).json(user_recipe);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let recipe = await Recipe.findOrCreate({
      where: { recipe_name: req.body.recipe_name },
    });
    res.status(201).json(recipe[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;