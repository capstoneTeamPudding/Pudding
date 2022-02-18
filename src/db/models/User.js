const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  uid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  isLoggedIn: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  currentRecipe: {
    type: Sequelize.INTEGER,
  },
  myRecipes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  myFav: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = User;
