const router = require('express').Router();
const { Party } = require('../../models');

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
