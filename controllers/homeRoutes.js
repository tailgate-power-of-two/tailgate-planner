const router = require('express').Router();
const { User } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('home', {
      layout: 'main',
      // logged_in: true,
      username: "Tester",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;