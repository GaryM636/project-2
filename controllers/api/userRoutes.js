const router = require('express').Router();
const { User } = require('../../models');
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage,})



// /api/users
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id; //copy and paste on all routes
      req.session.logged_in = true;
      req.session.userName = userData.userName; //copy and paste on all routes

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.userName = userData.userName;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/profile/:id', upload.single('profile_pic'), async (req, res) => {
  try {
    const userData = await User.update(
      {
        bio: req.body.bio,
        profilePic: req.file.buffer
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
