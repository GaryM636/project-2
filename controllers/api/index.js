const router = require('express').Router();
const postRoutes = require('./postRoutes');

router.use('/users', require('./userRoutes'));
router.use('/posts', postRoutes);
// router.use('/posts', require('./postRoutes')); 

// router.use('/comments', require('./commentRoutes'));

module.exports = router;