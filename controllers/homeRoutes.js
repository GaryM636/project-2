const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Comments, Posts, User, Games } = require('../models');
const multer  = require('multer');

// Renders the homepage with a banner for each game in the seeds or created
router.get('/', async (req, res) => {
  try {
    const gameData = await Games.findAll({
      included: {
        model: Posts
      }
    });
    const games = gameData.map(p => p.get({ plain: true }));
    res.render('homepage', {
      games,
      logged_in: req.session.logged_in,
      user_name: req.session.userName
    })
  } catch (err) {
    console.log(err);
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
router.get('/profile', withAuth, async (req, res) => {
  try {
    const postData = await User.findByPk( req.session.user_id,{
      include: [{
        model: Posts,
      }]
    })
    let user = postData.get ({ plain: true });
    if (user.profilePic) {
      user.profilePic = user.profilePic.toString('base64');
    }
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in,
      user_name: req.session.userName,
    })
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

// Get route for a single game view
router.get('/games/:id', async (req, res) => {
  try {
    const gameData = await Games.findByPk(req.params.id, {
      include: [{
        model: Posts, include: [{model: User}, {model: Comments}]
      }]
    })
    const game = gameData.get({ plain: true });
    console.log("looking-for-comments", game);
    res.render('singleGame', {
      ...game,
      logged_in: req.session.logged_in,
      user_name: req.session.userName,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

// Get route for a another users profile
router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: {
        model: Posts,
      },
    });
    const user = userData.get({ plain: true })
    if (user.profilePic) {
      user.profilePic = user.profilePic.toString('base64');
    };
    res.render('user', {
      ...user,
      logged_in: req.session.logged_in,
      user_name: req.session.userName,
      profilePic: user.profilePic.toString('base64'),
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

//route to get all posts for community page
router.get('/community', async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [{
        model: User,
      }]
    });
    const posts = postData.map(p => p.get({ plain: true }));
    console.log("posts", posts);
    res.render('community', {
      posts,
      logged_in: req.session.logged_in,
      user_name: req.session.userName,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;