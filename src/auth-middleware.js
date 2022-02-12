// require("dotenv").config();
// const { database } = require("firebase-admin");
// const admin = require("firebase-admin");

// const databaseName =
//   pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

// // const serviceAccount = require("../client/firebaseAuth/serviceAccountKey.json")

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// //   // databaseURL: `postgres://localhost:5432/${databaseName}`
// // });

// admin.initializeApp({
//   credential: admin.credential.cert({
//     "projectId": "ms-pudding-auth",
//     "clientEmail": "CLIENT_EMAIL",
//     "privateKey": "PRIVATE_KEY".replace(/\\n/g, '\n')
//   }),
//   databaseURL: `postgres://localhost:5432/${databaseName}`
// });


// const checkAuth = async (req, res, next) => {
//   try {
//     if (req.headers.authtoken) {
//       req.user = await admin.auth().verifyIdToken(req.headers.authtoken);
//       next();
//     } else {
//       res.status(403).send("Unauthorized");
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = { checkAuth };

