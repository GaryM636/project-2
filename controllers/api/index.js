const router = require('express').Router();
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
// router.use('/posts', require('./postRoutes')); 

// router.use('/comments', require('./commentRoutes'));

module.exports = router;