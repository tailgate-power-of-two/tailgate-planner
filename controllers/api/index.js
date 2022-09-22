const router = require('express').Router();
const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes');
const partyRoutes = require('./partyRoutes');

router.use('/users', userRoutes);
router.use('/meals', mealRoutes);
router.use('/party', partyRoutes);

module.exports = router;
