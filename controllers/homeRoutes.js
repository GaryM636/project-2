const router = require('express').Router();
const { Comments, Posts, User } = require('../models');


router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in, //copy and paste on all routes
      userName: req.session.userName, //copy and paste on all routes

    });
  } catch (err) {
    res.status(500).json(err);
  }
}); 

// Get route for when a user logs in
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
  }
  res.render('login')
});

// Get the user who signs in their profile
router.get('/profile', async (req, res) => {
  try {
    const postData = await Posts.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
    const post = postData.map(p => p.get({ plain: true }));
    console.log(post);
    res.render('profile', {
      post,
      logged_in: req.session.logged_in,
      userName: req.session.userName,
    })
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

module.exports = router;