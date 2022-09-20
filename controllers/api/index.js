const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const PartyRoutes = require('./PartyRoutes');

router.use('/users', userRoutes);
// router.use('/Party', PartyRoutes);

module.exports = router;
