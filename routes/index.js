const router = require('express').Router();

router.get('/', (req, res) => {
     res.send('Hello Friend, You are Welcome!');
  });

  router.use('/books', require('./books'));

  module.exports = router;