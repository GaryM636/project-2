const router = require('express').Router();

router.use('/users', require('./userRoutes'));

// router.use('/posts', require('./postRoutes')); 

// router.use('/comments', require('./commentRoutes'));

module.exports = router;