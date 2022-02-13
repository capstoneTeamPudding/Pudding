const { db } = require("../src/db");
const {
  models: { FoodItem, Fridge, Recipe, User_Recipe, User },
} = require("../src/db");

//seed dummy data
const fridges = [
  {
    userUid: "u087CSU21PhXkg73Rd4Uxa2ugtw2",
    foodItemId: 2,
    quantity: 3,
  },
  {
    userUid: "u087CSU21PhXkg73Rd4Uxa2ugtw2",
    foodItemId: 3,
    quantity: 1,
  },
  {
    userUid: "u087CSU21PhXkg73Rd4Uxa2ugtw2",
    foodItemId: 4,
    quantity: 1,
  },
  {
    userUid: "u087CSU21PhXkg73Rd4Uxa2ugtw2",
    foodItemId: 1,
    quantity: 1,
  },
];

const foodItems = [
  {
    foodItem_name: "broccoli",
    category: "vegetable",
  },
  {
    foodItem_name: "tomato",
    category: "vegetable",
  },
  {
    foodItem_name: "milk",
    category: "dairy",
  },
  {
    foodItem_name: "chocolate",
    category: "sweets",
  },
];

const users = [
  {
    uid: "u087CSU21PhXkg73Rd4Uxa2ugtw2",
    firstName: "Codys",
    lastName: "Fullstack",
    email: "cody@fullstack.com",
    password: "123456",
    isLoggedIn: true,
  },
  {
    uid: "innDr0j21XQl7pHHo7KhxMUYEuP2",
    firstName: "Lelena",
    lastName: "Lunt",
    email: "flunt0@va.gov",
    password: "WrwpJz",
    creditCard: "3553386734099169",
    isLoggedIn: true,
  },
];

const recipes = [
  {
    recipe_name: "Tomato Soup",
    steps:
      "1.Preheat oven to 450 degrees F2.Strain the chopped canned tomatoes, reserving the juices, and place in a mixing bowl*. Add basil, garlic, balsamic vinegar and 1 tablespoon of the olive oil. Toss or stir gently to mix. Spread tomato mixture onto a foil-lined (for easy cleanup), rimmed baking pan. Season with salt and pepper, to taste, and roast until caramelized, about 15 minutes. 3. Meanwhile, in a stock pot or large saucepan, heat remaining olive oil over medium heat. Add the celery, carrot, and onion, cook until softened, 8-10 minutes. Add the roasted tomato mixture, the reserved tomato juices, chicken broth, bay leaf, sugar and butter. Simmer until vegetables are very tender, about 15 to 20 minutes. 4. Remove bay leaf. Puree with a hand-held immersion blender until smooth, or blend in a regular blender, working in batches. Add dairy**, if using, stirring well to blend. Taste, and add salt and pepper as necessary.",
    ingredients:
      "28 ounce can chopped tomatoes, 2 heaping tablespoons fresh basil (leaves only), chopped or fine chiffonade (measured after chopping), 2 cloves garlic sliced, 1 teaspoon balsamic vinegar, 3 tablespoons extra virgin olive oil divided, 2 stalks celery diced, 2 small carrots diced, 1 yellow onion diced, 2 cups chicken or vegetable broth, 1 bay leaf, 1 teaspoon sugar, 2 tablespoons butter, 1 or 2 tablespoons heavy cream half and half or milk - optional, salt and freshly ground black pepper ",
    imageUrl:
      "https://soupaddict.com/wp-content/uploads/2011/01/tomatosoup6_012211.jpg",
    category: "vegetarian",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Recipe.bulkCreate(recipes);
    await User.bulkCreate(users);
    await FoodItem.bulkCreate(foodItems);
    await Fridge.bulkCreate(fridges);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error("Oh noes! Something went wrong!");
      console.error(err);
      db.close();
    });
}
