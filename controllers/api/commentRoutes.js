const router = require('express').Router();
const { Comment, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: 1,
        })

        res.status(200).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/:id', (req, res) => {
    Comment.update(
      {
        party_comment: `${req.body.party_comment} (edited)`,
      },
      { 
        where: {
          id: req.params.id,
        //   add back later so only the person who created it can delete it
        //   user_id: req.params.user_id,
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