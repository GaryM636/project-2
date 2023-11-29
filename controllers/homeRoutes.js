const router = require('express').Router();

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

module.exports = router;