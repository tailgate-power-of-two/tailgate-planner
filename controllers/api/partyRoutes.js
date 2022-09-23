const router = require('express').Router();
const { Party, Meal, User } = require('../../models');

// see list of guest
router.get('/guests/:id', (req, res) => {
  Meal.findAll({
      where: {
          party_id : req.params.id
      },
      attributes: ['user_id'],
      include: {
        model: User,
        attributes: ['first_name', 'last_name'],
      },
  })
  .then((dbPostData) => {
      if(dbPostData.length == 0){
          res.status(404).json({message: 'No guests found for this party'})
          return;
      }
      const allGuests = dbPostData.map((guest) => guest.get({ plain: true }));
      // https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
      function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
      }

      const guests = getUniqueListBy(allGuests, 'user_id')

      res.status(200).json(guests)
    })
  .catch((err) => {
  console.log(err);
  res.status(500).json(err);
  });
})

// add party
router.post('/', async (req, res) => {
  try {
    const newParty = await Party.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newParty);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update party info
router.put('/:id', (req, res) => {
  Party.update(
    {
      party_name: req.body.party_name,
      party_location: req.body.party_location,
      party_date: req.body.party_date,
      user_id: req.body.user_id,
    },
    { 
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedParty) => {
      res.json(updatedParty);
    })
    .catch((err) => res.json(err));
});

// delete party info
router.delete('/:id', async (req, res) => {
  try {
    const partyData = await Party.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!partyData) {
      res.status(404).json({ message: 'No party found with this id!' });
      return;
    }

    res.status(200).json(partyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
