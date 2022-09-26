const sequelize = require('../config/connection');
const { User, Party, Meal, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');


router.get('/', /*withAuth,*/ async (req, res) => {
  try {
    const partyData = await Party.findAll({
      attributes: ['id', 'party_name', 'party_location', 'party_date'], 
      include: [
        {
          model: Comment,
          attributes: ['id', 'party_comment', 'created_at'],
          include: {
            model: User,
            attributes: ['first_name', 'last_name'],
          },
        },
        {
          model: Meal,
          attributes: ['item_name', 'item_type', 'dietary'],
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
    });
 
      const posts = partyData.map((post) => post.get({ plain: true }));
      // console.log(req.session.username + " Dashboard Function")
      // console.log(posts);

      posts.sort((a, b) => a.party_date - b.party_date)

      res.render('all-party', {
        layout: 'userhome',
        posts,
        username: req.session.username,
        avi: req.session.avi, 
      });
      // res.status(200).json(posts)
    } catch (err) {
      console.log(err);
      res.status(500).json(err).redirect('login')
    }
});

router.get('/new', /*withAuth,*/ (req, res) => {

  res.render('new-party', {
    layout: 'userhome',
    username: req.session.username,
    avi: req.session.avi, 
  });
});

router.get('/:id', /*withAuth,*/ async (req, res) => {
  try {
    const partyData = await Party.findByPk(req.params.id, {
      attributes: ['id', 'party_name', 'party_location', 'party_date'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'party_comment', 'created_at'],
          include: {
            model: User,
            attributes: ['id', 'first_name', 'last_name'],
          },
        },
        {
          model: Meal,
          attributes: ['id', 'item_name', 'item_type', 'dietary',],
          include: {
            model: User,
            attributes: ['id', 'first_name', 'last_name'],
          },
        },
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });

    if (partyData) {
      const party = partyData.get({ plain: true });

      function iterate(item){
        item.userId = req.session.user_id;
        console.log(item);
      }

      party.meals.forEach(iterate);

      res.render('single-party', {
        layout: 'userhome',
        party,
        username: req.session.username,
        avi: req.session.avi,
        user_id: req.session.user_id

      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('/');
  }
});
router.get('/edit/:id', /*withAuth,*/ async (req, res) => {
  try {
    const partyData = await Party.findByPk(req.params.id, {
      attributes: ['id', 'party_name', 'party_location', 'party_date'],
    });

    if (partyData) {
      const party = partyData.get({ plain: true });
      console.log(party);

      const userId = req.session.user_id;
      console.log(userId)

      res.render('edit-party', {
        layout: 'userhome',
        party,
        username: req.session.username,
        avi: req.session.avi,
        user_id: req.session.user_id,
        party_id: partyData.id,
        party_name: partyData.party_name,
        party_location: partyData.party_location,
        party_date: partyData.party_date
        
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;