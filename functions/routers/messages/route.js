const express = require('express')
const router = express.Router()
const endPoint = '/messages'

router.route(endPoint)
  .get((req, res) => {

  })
  .post((req, res) => {

  })

router.route(`${endPoint}/:id`)
  .put((req, res) => {

  })
  .delete((req, res) => {

  })

module.exports = router