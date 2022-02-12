/* eslint-disable no-unused-vars */
const router = require("express").Router();
const FoodItem = require("../db/models/FoodItem");
const Fridge = require("../db/models/Fridge");
const User = require("../db/models/User");

let UserId = "u087CSU21PhXkg73Rd4Uxa2ugtw2";

router.get("/", async (req, res, next) => {
  try {
    const userFridge = await User.findAll({
      include: FoodItem,
    });

    res.json(userFridge);
  } catch (error) {
    next(error);
  }
});

router.get("/:userUid", async (req, res, next) => {
  try {
    const userFridge = await User.findOne({
      where: { uid: req.params.userUid },
      attributes: ["uid"],
      include: [
        {
          model: FoodItem,
          attributes: ["id", "foodItem_name"],
          required: true,
        },
      ],
    });
    res.json(userFridge);
  } catch (error) {
    next(error);
  }
});

router.get("/:userUid/:foodItemId", async (req, res, next) => {
  try {
    const userFood = await User.findOne({
      where: { uid: req.params.userUid },
      attributes: ["uid"],
      include: {
        model: FoodItem,
        where: { id: req.params.foodItemId },
      },
    });
    if (!userFood) {
      res.status(404).send("Sorry you don't have this in your fridge!");
    } else {
      res.json(userFood);
    }
  } catch (err) {
    next(err);
  }
});
//quantity update only?
router.put("/:userUid/:foodItemId", async (req, res, next) => {
  try {
    const userFridge = await Fridge.findOne({
      where: { userUid: req.body.userUid, foodItemId: req.body.foodItemId },
    });
    await userFridge.update(req.body);
    res.json(userFridge);
  } catch (error) {
    next(error);
  }
});

router.post("/:userUid", async (req, res, next) => {
  try {
    let fooditem = await FoodItem.findOrCreate({
      where: { foodItem_name: req.body.foodItem_name },
    });
    let currentUser = await User.findOne({
      where: { userUid: req.body.userUid },
    });
    let fridge = await currentUser.addFoodItem(fooditem[0], {
      through: { quantity: req.body.quantity },
    });
    res.status(201).json(fridge);
  } catch (error) {
    next(error);
  }
});

//entire fridge?
router.delete("/:userUid", async (req, res, next) => {
  try {
    const userFridgeItem = await Fridge.findAll({
      where: { userUid: req.body.userUid },
    });
    await userFridgeItem.destroy();
    res.send("Deleted");
  } catch (error) {
    next(error);
  }
});

//one thing in fridge
router.delete("/:userUid/:foodItemId", async (req, res, next) => {
  try {
    const userFridgeItem = await Fridge.findOne({
      where: { userUid: req.body.userUid, foodItemId: req.body.foodItemId },
    });
    await userFridgeItem.destroy();
    res.send("Deleted");
    res.status(204).send("No content");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
