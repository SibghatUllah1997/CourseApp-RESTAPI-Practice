const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { title: 'its my first express app' , message: 'Hello'  });
  });

  module.exports = router;
  