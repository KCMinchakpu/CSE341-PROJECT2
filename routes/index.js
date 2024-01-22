const router = require('express').Router();

router.get('/', (req, res) => {
     res.send('Hello Friend, You are Welcome!');
  });



  module.exports = router;