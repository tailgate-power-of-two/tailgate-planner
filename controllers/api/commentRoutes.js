const router = require('express').Router();
const { Comment, User } = require('../../models');

// all comments for one party
router.get('/party/:id', async (req, res) =>{
    Comment.findAll({
        where: {
            party_id : req.params.id
        },
        attributes: ['party_comment'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
    })
    .then((dbPostData) => {
        if(dbPostData.length == 0){
            res.status(404).json({message: 'No comments found for this party'})
            return;
        }
        const comments = dbPostData.map((comment) => comment.get({ plain: true }));
        res.status(200).json(comments)
      })
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
})

// add a comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            // set to 1 for testing change when live
            user_id: req.session.user_id,
        })

        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

// edit comment
router.put('/:id', (req, res) => {
    Comment.update(
      {
        party_comment: `${req.body.party_comment} (edited)`,
      },
      { 
        where: {
          id: req.params.id,
        //   add back later so only the person who created it can delete it
        //   user_id: req.session.user_id,
        },
      }
    )
      .then((updatedParty) => {
        res.json(updatedParty);
      })
      .catch((err) => res.json(err));
  });

// delete not sure if this will make the actual app or not
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        if (!commentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
    
        res.status(200).json(commentData);
      } catch (err) {
        res.status(500).json(err);
      }
})  

module.exports = router;