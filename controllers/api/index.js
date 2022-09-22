const router = require('express').Router();
const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes');
const partyRoutes = require('./partyRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/meals', mealRoutes);
router.use('/party', partyRoutes);
router.use('/comments', commentRoutes)

module.exports = router;
