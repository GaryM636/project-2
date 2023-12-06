const router = require('express').Router();
const { Comments } = require('../../models');

// /api/comments 

router.post('/', async (req, res) => {
    try {
        const comment = await Comments.create({
            ...req.body,
            logged_in: req.session.logged_in,
            userName: req.session.userName
        });
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});


module.exports = router;