const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
   //#swagger.Tags = ['hello world!]
     res.send('Hello Friend, You are Welcome!');
  });

  router.use('/books', require('./books'));

  module.exports = router;