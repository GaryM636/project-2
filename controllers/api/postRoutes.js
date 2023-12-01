const router = require('express').Router();
const { Posts } = require('../../models');

// Creates a post
router.post('/', async (req, res) => {
    try {
        const newPosts = await Posts.create({
            ...req.body,
            logged_in: req.session.logged_in,
            userName: req.session.userName
        });
        res.status(200).json(newPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})


module.exports = router;  