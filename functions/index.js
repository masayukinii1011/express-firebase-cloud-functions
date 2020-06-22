const functions = require('firebase-functions')
const express = require('express')

const app = express()

exports.api = functions.region('asia-northeast1').https.onRequest(app)