const router = require("express").Router();
const {Comment} = require("../../Models");+

// Get all comments for a specific post
router.get("/", (req, res) => {
    Comment.findAll()
    .then(commentData => {
        res.json(commentData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
})

// Post a comment to a specific post
router.post("/", (req, res) => {
    // Check whether user has a logged-in session
    Comment.create({
        comment_text: req.body.comment_text,
        // user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(commentData => {
        res.json(commentData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;