const router = require('express').Router();

const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);

router.use('/api', require('./api'));

module.exports = router;