const router = require('express').Router();
const { Posts } = require('../../models');

// /api/posts

// Creates a post
router.post('/', async (req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
        console.log("new-Post", newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

module.exports = router;  