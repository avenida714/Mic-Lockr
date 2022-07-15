// backend/routes/api/index.js
const router = require('express').Router();


router.get('/test', function(req, res) {
  res.send("let's go");
});



module.exports = router;
