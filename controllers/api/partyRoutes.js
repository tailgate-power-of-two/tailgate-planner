const router = require('express').Router();
const { Party } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newProject = await Party.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newParty);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const partyData = await Party.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
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
