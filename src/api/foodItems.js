const router = require("express").Router();
const FoodItem = require("../db/models/FoodItem");

router.get("/", async (req, res, next) => {
  try {
    const foodItems = await FoodItem.findAll();
    res.json(foodItems);
  } catch (err) {
    next(err);
  }
});

router.get("/:foodItemId", async (req, res, next) => {
  try {
    const foodItem = await FoodItem.findOne({
      where: { id: req.params.foodItemId },
    });
    if (!foodItem) {
      res.status(404).send("Sorry this foodItem does not exist!");
    } else {
      res.json(foodItem);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let fooditem = await FoodItem.findOrCreate({
      where: { foodItem_name: req.body.foodItem_name },
    });
    res.status(201).json(fooditem[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/:foodItemId", async (req, res, next) => {
  try {
    const foodItem = await FoodItem.findOne({
      where: { id: req.params.foodItemId },
    });
    await foodItem.update(req.body);
    await foodItem.save();
    res.send(foodItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
