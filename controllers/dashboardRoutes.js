const sequelize = require('../config/connection');
const { User, Party, Meal, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Party.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ['id', 'party_name', 'party_location', 'party_date'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'party_comment', 'party_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      },
      {
        model: Meal,
        attributes: ['id', 'item_name', 'item_type', 'dietary', 'party_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      },
      {
        model: User,
        attributes: ['first_name', 'last_name'],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        logged_in: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/edit/:id', withAuth, (req, res) => {
  Party.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'Party_name', 'Party_location', 'Party_date'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'party_comment', 'party_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      },
      {
        model: Meal,
        attributes: ['id', 'item_name', 'item_type', 'dietary', 'party_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      },
      {
        model: User,
        attributes: ['first_name', 'last_name'],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Party found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });
      console.log('sending ' + req.session.username);
      res.render('edit-post', {
        post,
        logged_in: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/new', (req, res) => {
  res.render('new-post', { username: req.session.username });
});

module.exports = router;
