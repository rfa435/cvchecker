var express = require('express');
var router = express.Router();
const config = require("../config")
const apiControllers = require("../controllers")

router.post('/upload-pdf', config.uploads.single("pdf"), [
  apiControllers.index
]);

router.get('/history-scoring/:user', [
  apiControllers.history
]);

module.exports = router;
