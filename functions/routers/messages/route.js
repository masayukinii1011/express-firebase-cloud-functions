const express = require('express')
const admin = require('firebase-admin')

const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nii-express-cloud-functions.firebaseio.com"
});

const router = express.Router()
const endPoint = '/messages'
const db = admin.firestore()

router.route(endPoint)
  .get(async (req, res) => {
    const messages = []
    try {
      const querySnapshot = await db.collection('messages').get()
      querySnapshot.forEach(doc => {
        messages.push({
          id: doc.id,
          ...doc.data()
        })
      })
    } catch (error) {
      console.error(error)
    }
    res.json({ messages })
  })
  .post((req, res) => {

  })

router.route(`${endPoint}/:id`)
  .put((req, res) => {

  })
  .delete((req, res) => {

  })

module.exports = router