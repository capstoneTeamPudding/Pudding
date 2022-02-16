# The Thymely Cook

![Logo](/assets/thyme_logo.png)

## Table of Contents

- [Introduction](#introduction)
- [Developers](#developers)
- [Features](#features)
- [Getting Started](#getting-started)


# Introduction

Do you struggle with what to choose for dinner every night? Or maybe, you’re the type of person that forgets what they even have in their fridge? These are two big issues our team strived to streamline with our app, The Thymely Cook. The Thymely Cook is an Android and iOS mobile app that allows users to scan their groceries into a virtual fridge and then to search for recipes based on those ingredients. With The Thymely Cook, you’ll never struggle with indecisiveness or food waste again.

# Developers 

Ann (Ania) Marecki - [GitHub](https://github.com/annmarecki) | [LinkedIn](https://www.linkedin.com/in/annmarecki/)
Elena Zobak -
Krystin Fields - 
Keranie Theodosiou - 

# Features

- **User Account**
  - User can sign-up for an account, login, and logout
  - User can view and edit their account profile
  - User can change their password
  - Persistant login using **Firebase** Authentication
- **Fridge**
  - User can scan any food barcode to add food to a virtual fridge.
  - User can view all their food in their fridge
  - User can view, add, edit, and edit food items
  - User can recieve recipe suggestions based on an ingredient
- **Recipes**
  - User can recieve recipe suggestions
  - User can click on any suggested recipe to view details
  - User can save recipes to favorites 
  - User can view favorites on the favorites tab
  
# Getting Started

  Fork and clone this repo. Fork and clone this repo. Then, `npm install`.

Create a git ignore file:
`touch keys.js`

Add the following Firebase and API info:

```
const API_KEY = "your api key for firebase here";
const AUTH_DOMAIN = "insert your auth domain .firebaseapp.com";
const PROJECT_ID = "your project id for firebase here";
const STORAGE_BUCKET = "your project id here.appspot.com";
const MESSAGING_SENDER_ID = "your sender id here";
const APP_ID = "your app id here";
const MEASUREMENT_ID = your measurement id here";
const SPOON_API_KEY = "your spoonacular key here ";
const EDEMAM_ID = "your edemam api id here";
const EDEMAM_KEY = "your edemam api key here";
module.exports = {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  SPOON_API_KEY,
  HEROKU_DB,
  EDEMAM_ID,
  EDEMAM_KEY,
};

download expo go on your phone OR if you have XCode, the simulator will run there
run npm run start:dev

```
  

