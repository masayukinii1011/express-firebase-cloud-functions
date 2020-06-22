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
  .post(async (req, res) => {
    const { name, body } = req.body
    try {
      const docRef = await db.collection('messages').add({
        name, body
      })

      const docSnapshot = await docRef.get()
      const createdMessage = {
        id: docSnapshot.id,
        ...docSnapshot.data()
      }
      res.json({ createdMessage })
    } catch (error) {
      console.error(error)
    }
  })

router.route(`${endPoint}/:id`)
  .put(async (req, res) => {
    const { id } = req.params
    const { name, body } = req.body
    const newData = { name, body }
    try {
      await db.collection('messages').doc(id).update(newData)
      res.json({ message: `updated! ID: ${id}` })
    } catch (error) {
      console.error(error)
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params
    try {
      await db.collection('messages').doc(id).delete()
      res.json({ message: `deleted! ID: ${id}` })
    } catch (error) {
      console.error(error)
    }
  })

module.exports = router