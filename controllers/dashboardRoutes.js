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
            attributes: ['first_name', 'last_name'],
          },
        },
        {
          model: Meal,
          attributes: ['item_name', 'item_type', 'dietary',],
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

    if (partyData) {
      const party = partyData.get({ plain: true });
      console.log(party);

      res.render('single-party', {
        layout: 'userhome',
        party,
        username: req.session.username,
        avi: req.session.avi,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

// router.get('/:id', /* withAuth,*/ (req, res) => {
//   Party.findByPk(req.params.id, {
//     attributes: ['id', 'party_name', 'party_location', 'party_date'],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'party_comment', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['first_name', 'last_name'],
//         },
//       },
//       {
//         model: Meal,
//         attributes: ['item_name', 'item_type', 'dietary',],
//         include: {
//           model: User,
//           attributes: ['first_name', 'last_name'],
//         },
//       },
//       {
//         model: User,
//         attributes: ['first_name', 'last_name'],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No Party found with this id' });
//         return;
//       }

//       const post = dbPostData.get({ plain: true });
//       // console.log('sending ' + req.session.username);
//       // res.render('edit-post', {
//       //   post,
//       //   // logged_in: true,
//       //   // username: req.session.username,
//       // });

//       // const posts = dbPostData.map((post) => post.get({ plain: true }));
//       res.render('single-party', {
//         layout: 'userhome',
//         post,
//         // logged_in: true,
//         username: req.session.username,
//       });

//       // res.status(200).json(post)
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;